import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class NotificationService {
    public showErrorMessage(...errors: any[]): void {
        console.error(...errors);
    }
}
