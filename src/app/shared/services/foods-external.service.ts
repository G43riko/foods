import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import * as browserRequest from "browser-request";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs/internal/observable/of";
import {catchError, tap} from "rxjs/operators";
import {Config} from "../../appConfig";
import {AbstractService} from "./abstract.service";
import {NotificationService} from "./notification.service";

const prefix = "http://g43.clanweb.eu/proxy.php?url=";

class HtmlSimulator {
    private readonly html: HTMLHtmlElement;

    public constructor(content: string) {
        this.html = document.createElement("html") as HTMLHtmlElement;
        this.html.innerHTML = content;
        this.html.style.display = "none";
        document.body.appendChild(this.html);
    }

    public find(query: string): HTMLElement | null {
        return this.html.querySelector(query);
    }

    public cleanUp(): void {
        document.body.removeChild(this.html);
    }
}

function getDate(): string {
    const a = new Date();

    return a.getDate() + "-" + a.getMonth() + "-" + a.getFullYear();
}

@Injectable({
    providedIn: "root",
})
export class FoodsExternalService extends AbstractService {
    private static readonly ACTUAL_DATE = getDate();
    private readonly headers = new HttpHeaders({
        "user-key": Config.ZOMATO_API_KEY,
    });

    public constructor(private readonly notificationService: NotificationService, http: HttpClient) {
        super(http);
    }

    public getZomatoFoodRaw(id: string): Observable<any> {
        const foodKey: string = FoodsExternalService.ACTUAL_DATE + "-" + id;
        const result: string = localStorage.getItem(foodKey);
        if (result) {
            try {
                return of(JSON.parse(result));
            } catch (e) {
                this.notificationService.showErrorMessage("Cannot parse stored food data. id: ", id, "foodKey: ", foodKey);
            }
        }

        return this.callZomatoApi(Config.ZOMATO_API_URL + "?res_id=" + id, foodKey);
    }

    private callZomatoApi(url: string, foodKey: string): Observable<any> {
        return this.http.get(url, {headers: this.headers}).pipe(
            tap((data) => {
                const loadedData = localStorage.getItem(foodKey);
                const stringifyData = JSON.stringify(data);
                if (!loadedData || loadedData !== stringifyData) {
                    localStorage.setItem(foodKey, stringifyData);
                }
            }),
            catchError(this.handleError),
        );
    }

    private getContentAndCall(url: string, callBack: (body: string) => any): Observable<any> {
        return new Observable<any>((subject) => {
            browserRequest(prefix + url, (error, response) => {
                try {
                    subject.next(callBack(response.body));
                    subject.complete();
                } catch (error) {
                    subject.error(error);
                }
            });
        });
    }

    public getMenuFromSmeRestaurant(urlPostfix: string): Observable<string[]> {
        if (!urlPostfix.startsWith("/")) {
            throw new Error("postfix must starts with '/'");
        }

        if (!urlPostfix.endsWith("/denne-menu")) {
            throw new Error("postfix must ends with '/denne-menu'");
        }

        return this.getContentAndCall("https://restauracie.sme.sk/restauracia" + urlPostfix, this.parseSmeRestaurant);
    }

    private parseSmeRestaurant(rawHtml: string): string[] {
        const environment = new HtmlSimulator(rawHtml);
        const subResult = environment.find(".dnesne_menu");
        environment.cleanUp();
        if (!subResult) {
            return null;
        }
        const result = [];
        subResult.querySelectorAll(".jedlo_polozka").forEach((item: HTMLElement) => {
            result.push(item.innerText.trim());
        });

        return result;
    }
}
