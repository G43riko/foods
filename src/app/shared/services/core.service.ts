import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class CoreService {
    public getDate(): string {
        const a = new Date();

        return a.getDate() + "-" + a.getMonth() + "-" + a.getFullYear();
    }
}
