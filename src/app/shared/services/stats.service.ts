import {HttpClient} from "@angular/common/http";
import {Injectable, isDevMode} from "@angular/core";
import * as qs from "querystring";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs/internal/observable/of";
import {catchError} from "rxjs/operators";
import {AbstractService} from "./abstract.service";

const url = "http://g43.clanweb.eu/foods/uploader.php";
const password = "gabriel";
const login = "gabriel";

@Injectable()
export class StatsService extends AbstractService {
    /*
    private readonly headers = new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        "Referrer-Policy": "no-referrer",
    });
    */
    public constructor(http: HttpClient) {
        super(http);
    }

    public setVisit(): Observable<any> {
        if (isDevMode()) {
            return of("success");
        }

        return this.http.post(url, qs.stringify({
            password, login,
            content: "null",
            type: "users",
        }), {
            withCredentials: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).pipe(catchError(this.handleError));
    }

    public storeMenu(menu: any): Observable<any> {
        if (isDevMode()) {
            return of("success");
        }

        return this.http.post(url, qs.stringify({
            password, login,
            type: "menus",
            content: encodeURIComponent(JSON.stringify(menu)),
        }), {
            withCredentials: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).pipe(catchError(this.handleError));
    }

}
