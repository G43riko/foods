import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {StringMap} from "../utils/string-map";

export abstract class AbstractService<T = any> {
    protected constructor(protected readonly http: HttpClient) {

    }

    protected handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    private getHeader(): HttpHeaders {
        const headers = new HttpHeaders();

        return headers;
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
}
