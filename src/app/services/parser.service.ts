import {Injectable} from "@angular/core";
import * as browserRequest from "browser-request";
const days = ["pondelok", "utorok", "streda", "štvrtok", "piatok"];
@Injectable()
export class ParserService {
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
                        const result = subResult.innerText.split("\n\n").filter(e => days.some(day => e.startsWith(day.toUpperCase())))[new Date().getDay() - 1];
                        success(result);
                    } else {
                        reject("cannot find element");
                    }
                } catch (e) {
                    reject(e);
                }
                finally {
                    document.body.removeChild(element);
                }
            });
        });


    }
}
