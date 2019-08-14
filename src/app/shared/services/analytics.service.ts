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
        gtag("event", "highlight", {key});

        // OLD
        gtag("event", "userEvent", {
            event_category: "highlight",
            event_label: key,
        });
    }
    public showImages(key: string): void {
        gtag("event", "showImages", {key});

        // OLD
        gtag("event", "userEvent", {
            event_category: "showImages",
            event_label: key,
        });
    }

    public openMap(restaurantKey: string): void {
        gtag("event", "openMap", {restaurantKey});

        // OLD
        gtag("event", "userEvent", {
            event_category: "openMap",
            event_label: restaurantKey,
        });
    }

    public addRestaurant(key: string): void {
        gtag("event", "restaurantManagement", {
            event_category: "add",
            event_label: key,
        });

        // OLD
        gtag("event", "userEvent", {
            event_category: "addRestaurant",
            event_label: key,
        });
    }

    public removeRestaurant(key: string): void {
        gtag("event", "restaurantManagement", {
            event_category: "remove",
            event_label: key,
        });

        // OLD
        gtag("event", "userEvent", {
            event_category: "removeRestaurant",
            event_label: key,
        });
    }

}
