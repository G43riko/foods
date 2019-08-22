import {Pipe, PipeTransform} from "@angular/core";
import {Dish} from "../../../shared/models/dish.model";
import {StringUtils} from "../../../shared/utils/StringUtils";

const tagStart = `<span class="searched">`;
const tagEnd = `</span>`;
const regex = new RegExp(`(${tagStart}|${tagEnd})`, "g");

@Pipe({
    name: "searchFoodPipe",
})
export class SearchFoodPipe implements PipeTransform {
    public transform(value: Dish[], key: string): Dish[] {
        if (!value) {
            return [null];
        }
        value.forEach((item) => item.name && (item.name = item.name.replace(regex, "")));
        if (!key) {
            return value;
        }
        const query = StringUtils.removeAccentedCharacters(key.toLowerCase());

        const result = value.filter((menu) => {
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

        return result.length > 0 ? result : [null];
    }
}
