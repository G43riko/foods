import * as qs from "querystring";
import {AbstractService} from "./abstract.service";
import {Injectable, isDevMode} from "@angular/core";
import {HttpClient} from "@angular/common/http";

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

    public setVisit(): Promise<any> {
        if (isDevMode()) {
            return Promise.resolve("success");
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
        }).toPromise().catch(this.handleError);
    }

    public storeMenu(menu: any): Promise<any> {
        if (isDevMode()) {
            return Promise.resolve("success");
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
        }).toPromise().catch(this.handleError);
    }

}
