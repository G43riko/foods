import {Injectable} from "@angular/core";
import {Config} from "../../appConfig";
import {Dish} from "../models/dish.model";

@Injectable()
export class FoodsService {
    public processDelphineMenu(menu: string): Dish[] {
        if (!menu) {
            return [];
        }
        const splitMenu = menu.split("\n").splice(1, 100);

        return splitMenu.map((foodName, i) => {
            return new Dish("", foodName, i === 0 ? undefined : "4.40€");
        });

    }

    public processZomatoMenu(menu: any): Dish[] {
        const data = menu.daily_menus.length && menu.daily_menus[0].daily_menu.dishes || [];
        const result: Dish[] = [];
        data.forEach((item: any) => {
            const weightResult = item.dish.name.match(Config.WEIGHT_REGEXP);
            if (weightResult) {
                const price = "<b>" + weightResult[0].replace(/(\/)/g, "")
                    .replace(",", ".")
                    .trim() + "</b>";

                item.dish.name = price + ": " + item.dish.name.replace(Config.WEIGHT_REGEXP, " ").replace(Config.REGEXP, " ");
            }

            const priceResult = item.dish.name.match(Config.PRICE_REGEXP);
            if (priceResult) {
                item.dish.price = priceResult[0] + " €";
                item.dish.name = item.dish.name.replace(Config.PRICE_REGEXP, " ");
            }
            //
            result.push(new Dish(item.dish.dish_id, item.dish.name, item.dish.price));
        });

        return result;
    }
}
