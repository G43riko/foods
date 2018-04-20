import {Pipe, PipeTransform} from "@angular/core";
import {removeAccentedCharacters} from "../utils/string-utils";

@Pipe({
    name: "searchPipe"
})
export class SearchPipe implements PipeTransform {

    transform(value: any[], key: string): any {
        if (!value) {
            return [];
        }
        value.forEach((item) => item.dish.name = item.dish.name.replace(/(<span class="searched">|<\/span>)/g, ""));
        if (!key) {
            return value;
        }
        const query = removeAccentedCharacters(key.toLowerCase());
        return value.filter((menu) => {
            const index = removeAccentedCharacters(menu.dish.name.toLowerCase()).indexOf(query);
            if (index >= 0) {
                menu.dish.name = menu.dish.name.substr(0, index) +
                                 `<span class="searched">${menu.dish.name.substr(index, query.length)}</span>` +
                                 menu.dish.name.substr(index + query.length, menu.dish.name.length - (index + query.length));
                console.log(menu.dish.name);
            }
            return index >= 0;
        });
    }

}
