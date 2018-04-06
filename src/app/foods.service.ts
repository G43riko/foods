import { Config } from "./appConfig";
import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/toPromise";


@Injectable()
export class FoodsService {
    private headers = new HttpHeaders({
        "user-key": Config.ZOMATO_API_KEY
    });
    public constructor(private http: HttpClient) {
    }

    public getZomatoFood(id: string): Promise<any> {
        return this.http.get(Config.ZOMATO_API_URL + "?res_id=" + id, {headers: this.headers})
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("error: ", error);
        return Promise.reject(error.message || error);
    }
}
