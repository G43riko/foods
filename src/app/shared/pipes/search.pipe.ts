import {Pipe, PipeTransform} from "@angular/core";
import {Dish} from "../models/dish.model";
import {StringUtils} from "../utils/StringUtils";

const tagStart = `<span class="searched">`;
const tagEnd = `</span>`;
const regex = new RegExp(`(${tagStart}|${tagEnd})`, "g");

@Pipe({
    name: "searchPipe",
})
export class SearchPipe implements PipeTransform {

    public transform(value: Dish[], key: string): any {
        if (!value) {
            return [];
        }
        value.forEach((item) => item.name = item.name.replace(regex, ""));
        if (!key) {
            return value;
        }
        const query = StringUtils.removeAccentedCharacters(key.toLowerCase());

        return value.filter((menu) => {
            const index = StringUtils.removeAccentedCharacters(menu.name.toLowerCase()).indexOf(query);
            if (index >= 0) {
                menu.name = menu.name.substr(0, index) +
                    tagStart +
                    menu.name.substr(index, query.length) +
                    tagEnd +
                    menu.name.substr(index + query.length, menu.name.length - (index + query.length));
            }

            return index >= 0;
        });
    }
}
