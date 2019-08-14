import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs/internal/observable/of";
import {catchError, tap} from "rxjs/operators";
import {Config} from "../../appConfig";
import {AbstractService} from "./abstract.service";
import {NotificationService} from "./notification.service";

function getDate(): string {
    const a = new Date();

    return a.getDate() + "-" + a.getMonth() + "-" + a.getFullYear();
}

@Injectable({
    providedIn: "root",
})
export class FoodsRestService extends AbstractService {
    private static readonly ACTUAL_DATE = getDate();
    private readonly headers = new HttpHeaders({
        "user-key": Config.ZOMATO_API_KEY,
    });

    public constructor(private readonly notificationService: NotificationService, http: HttpClient) {
        super(http);
    }

    public getZomatoFood(id: string): Observable<any> {
        const foodKey: string = FoodsRestService.ACTUAL_DATE + "-" + id;
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
}
