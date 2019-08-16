import {EventEmitter, Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TranslateMockService {
    public readonly onLangChange: EventEmitter<any> = new EventEmitter();
    public readonly onTranslationChange: EventEmitter<any> = new EventEmitter();
    public readonly onDefaultLangChange: EventEmitter<any> = new EventEmitter();

    public get(key: string): Observable<string> {
        return of(key);
    }

    public setDefaultLang(lang: string): void {
        // empty;
    }
    public use(lang: string): void {
        // empty;
    }

    public getBrowserLang(): string {
        return "en";
    }
}
