import {Pipe, PipeTransform} from "@angular/core";
import {removeAccentedCharacters} from "../utils/string-utils";

const tagStart = `<span class="searched">`;
const tagEnd = `</span>`;
const regex = new RegExp(`(${tagStart}|${tagEnd})`, "g");

@Pipe({
    name: "searchPipe"
})
export class SearchPipe implements PipeTransform {

    public transform(value: any[], key: string): any {
        if (!value) {
            return [];
        }
        value.forEach((item) => item.dish.name = item.dish.name.replace(regex, ""));
        if (!key) {
            return value;
        }
        const query = removeAccentedCharacters(key.toLowerCase());
        return value.filter((menu) => {
            const index = removeAccentedCharacters(menu.dish.name.toLowerCase()).indexOf(query);
            if (index >= 0) {
                menu.dish.name = menu.dish.name.substr(0, index) +
                                 tagStart +
                                 menu.dish.name.substr(index, query.length) +
                                 tagEnd +
                                 menu.dish.name.substr(index + query.length, menu.dish.name.length - (index + query.length));
            }
            return index >= 0;
        });
    }

}
