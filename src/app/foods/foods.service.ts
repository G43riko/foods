import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Config } from "../appConfig";
import "rxjs/add/operator/toPromise";


@Injectable()
export class FoodsService {
	constructor(private http: Http) {}

	getJournalFood(): Promise<any> {
		const headers = new Headers();
		headers.append("user-key", Config.ZOMATO_API_KEY);

		return this.http.get(Config.ZOMATO_API_URL + "?res_id=" + Config.JOURNAL_ID, {headers: headers})
						.toPromise()
						.then(response => response.json())
						.catch(this.handleError);
	}
	getAstraFood(): Promise<any> {
		const headers = new Headers();
		headers.append("user-key", Config.ZOMATO_API_KEY);

		return this.http.get(Config.ZOMATO_API_URL + "?res_id=" + Config.ASTRA_ID, {headers: headers})
						.toPromise()
						.then(response => response.json())
						.catch(this.handleError);
	}

	getDelfinFood(): Promise<any> {
		const headers = new Headers();
		headers.append("user-key", Config.ZOMATO_API_KEY);

		return this.http.get(Config.ZOMATO_API_URL + "?res_id=" + Config.DELFIN_ID, {headers: headers})
						.toPromise()
						.then(response => response.json())
						.catch(this.handleError);
	}

	getPrestoFood(): Promise<any> | void {
		function myFunction(item: any) {
			console.log("item: ", item);
		}
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				myFunction(this);
			}
		};
		xhttp.open("GET", Config.PRESTO_URL, true);

		xhttp.withCredentials = true;
		// xhttp.setRequestHeader("Access-Control-Allow-Origin", "http://www.restaurantpresto.sk")
		xhttp.send();
		/*
		return this.http.get("http://www.restaurantpresto.sk/sk/menu/presto-bbc-i/7.7.2017/")
						.toPromise()
						.then(response => console.log(response))
						.catch(this.handleError);
						*/
	}
	private handleError(error: any): Promise<any> {
		return Promise.reject(error.message || error);
	}
}
