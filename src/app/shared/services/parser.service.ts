import {Injectable} from "@angular/core";
import * as browserRequest from "browser-request";
import {Config} from "../../appConfig";

@Injectable({
    providedIn: "root",
})
export class ParserService {
    public parseFoodooMenu(): Promise<string[]> {
        return new Promise((success, reject) => {
            browserRequest("https://restauracie.sme.sk/restauracia/foodoo-prievozska_10461-ruzinov_2980/denne-menu", (error, response) => {
                const element = document.createElement("html") as HTMLHtmlElement;
                try {
                    element.innerHTML = response.body;
                    element.style.display = "none";
                    document.body.appendChild(element);
                    const subResult = document.querySelectorAll(".dnesne_menu")[1] as HTMLElement;
                    if (subResult) {
                        const result = [];
                        subResult.querySelectorAll(".jedlo_polozka").forEach((item: HTMLElement) => {
                            result.push(item.innerText);
                        });
                        success(result);
                    } else {
                        reject("cannot find element");
                    }
                } catch (e) {
                    reject(e);
                } finally {
                    document.body.removeChild(element);
                }
            });
        });
    }
    public parseDelfinMenus(): Promise<string> {
        return new Promise((success, reject) => {
            browserRequest("http://restauraciadelfin.sk/aktualne-denne-menu", (error, response) => {
                const element = document.createElement("html") as HTMLHtmlElement;
                try {
                    element.innerHTML = response.body;
                    element.style.display = "none";
                    document.body.appendChild(element);
                    const subResult = document.querySelectorAll(".col-sm-8.col-sm-offset-2.text-center")[1] as HTMLElement;
                    if (subResult) {
                        const result = subResult.innerText
                            .split("\n\n")
                            .filter((e) => Config.DAYS.some((day) => e.startsWith(day.toUpperCase())))
                            [new Date().getDay() - 1];
                        success(result);
                    } else {
                        reject("cannot find element");
                    }
                } catch (e) {
                    reject(e);
                } finally {
                    document.body.removeChild(element);
                }
            });
        });
    }
}
