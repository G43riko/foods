import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {StringMap} from "../interfaces/string-map";

export abstract class AbstractService<T = any> {
    protected constructor(protected readonly http: HttpClient) {

    }

    protected handleError(error: any): Observable<any> {
        // return of (error.message || error);
        throw new Error(error.message || error);
    }

    protected getParameters(parameters: StringMap): HttpParams {
        let httpParams = new HttpParams();
        if (parameters) {
            for (const key in parameters) {
                if (parameters.hasOwnProperty(key)) {
                    httpParams = httpParams.append(key, parameters[key]);
                }
            }
        }

        return httpParams;
    }

    private getHeader(): HttpHeaders {
        return new HttpHeaders();
    }
}
