import {Pipe, PipeTransform} from "@angular/core";
import {Restaurant} from "../models/restaurant.model";
import {StringUtils} from "../utils/StringUtils";

@Pipe({
    name: "searchRestaurantPipe",
})
export class SearchRestaurantPipe implements PipeTransform {
    public transform(value: Restaurant[], key: string): Restaurant[] {
        if (!value) {
            return [null];
        }
        if (!key) {
            return value;
        }
        const query = StringUtils.removeAccentedCharacters(key.toLowerCase());

        return value.filter((restaurant) => {
            const nameIndex = StringUtils.removeAccentedCharacters(restaurant.name.toLowerCase()).indexOf(query);
            const keyIndex = StringUtils.removeAccentedCharacters(restaurant.key.toLowerCase()).indexOf(query);

            return nameIndex >= 0 || keyIndex >= 0;
        });

    }
}
