import * as qs from "querystring";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

const url = "http://g43.clanweb.eu/foods/uploader.php";
const password = "gabriel";
const login = "gabriel";

@Injectable()
export class StatsService {
    public constructor(private http: HttpClient) { }
    public setVisit(): Promise<any> {
        return this.http.post(url, qs.stringify({
            password, login,
            content: "null",
            type: "users"
        }), {
            withCredentials: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Referrer-Policy": "no-referrer",
            },
        }).toPromise().catch(this.handleError);
    }

    public storeMenu(menu: any): Promise<any> {
        return this.http.post(url, qs.stringify({
            password, login,
            type: "menus",
            content: encodeURIComponent(JSON.stringify(menu))
        }), {
            withCredentials: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Referrer-Policy": "no-referrer",
            },
        }).toPromise().catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("error: ", error);
        return Promise.reject(error.message || error);
    }
}

