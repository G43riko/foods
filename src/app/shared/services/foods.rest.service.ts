import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";
import {Config} from "../../appConfig";
import {AbstractService} from "./abstract.service";

function getDate(): string {
    const a = new Date();

    return a.getDate() + "-" + a.getMonth() + "-" + a.getFullYear();
}

@Injectable()
export class FoodsRestService extends AbstractService {
    private static readonly ACTUAL_DATE = getDate();
    private readonly headers = new HttpHeaders({
        "user-key": Config.ZOMATO_API_KEY,
    });

    public constructor(http: HttpClient) {
        super(http);
    }

    private callZomatoApi(url: string, foodKey: string): Promise<any> {
        return this.http.get(url, {headers: this.headers})
            .pipe(
                tap((data) => {
                    const loadedData: string = localStorage.getItem(foodKey);
                    const stringifyData = JSON.stringify(data);
                    if (!loadedData || loadedData !== stringifyData) {
                        localStorage.setItem(foodKey, stringifyData);
                    }
                }),
            )
            .toPromise()
            .catch(this.handleError);
    }

    public getZomatoFood(id: string): Promise<any> {
        const foodKey: string = FoodsRestService.ACTUAL_DATE + "-" + id;
        const result: string = localStorage.getItem(foodKey);
        if (result) {
            try {
                return Promise.resolve(JSON.parse(result));
            } catch (e) {
                console.error("Cannot parse stored food data. id: ", id, "foodKey: ", foodKey);
            }
        }

        return this.callZomatoApi(Config.ZOMATO_API_URL + "?res_id=" + id, foodKey);
    }
}
