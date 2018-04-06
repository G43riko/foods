import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

const url = "http://g43.clanweb.eu/foods/uploader.php";
const password = "gabriel";
const login = "gabriel";

@Injectable()
export class StatsService {
    public constructor(private http: HttpClient) { }
    public setVisit(): Promise<any> {
        return this.http.get(url, {
            withCredentials: true,
            params: {
                password, login,
                content: "null",
                type: "users"
            }
        }).toPromise().catch(this.handleError);
    }

    public storeMenu(menu: any): Promise<any> {
        return this.http.get(url, {
            withCredentials: true,
            params: {
                password, login,
                content: JSON.stringify(menu),
                type: "menus"
        }
        }).toPromise().catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("error: ", error);
        return Promise.reject(error.message || error);
    }
}

