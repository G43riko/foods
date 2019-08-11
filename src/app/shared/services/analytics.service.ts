import {Injectable} from "@angular/core";

declare const gtag: any;

@Injectable({
    providedIn: "root",
})
export class AnalyticsService {
    public login(method: "google" | "github" | "facebook"): void {
        gtag("event", "login", {method});
    }

    public logout(): void {
        gtag("event", "userEvent", {
            event_category: "logout",
        });
    }

    public highlight(key: string): void {
        console.log("hladáme: ", key);
        gtag("event", "userEvent", {
            event_category: "highlight",
            event_label: key,
        });
        console.log("Dohladali sme");
    }
}
