import {Injectable} from "@angular/core";
import {Config} from "../../appConfig";
import {Dish} from "../models/dish.model";

@Injectable({
    providedIn: "root",
})
export class FoodsService {
    public processZomatoMenu(menu: any): Dish[] {
        const result: Dish[] = [];
        const dailyMenus = Object.values(menu.daily_menus);
        const dishes = dailyMenus.map((dailyMenu: any) => dailyMenu.daily_menu.dishes).reduce((prev, curr) => [...prev, ...curr], []);

        dishes.forEach((dish: any) => {
            this.processZomatoWeight(dish.dish);
            this.processZomatoPrice(dish.dish);
            result.push(new Dish(dish.dish.dish_id, dish.dish.name, dish.dish.price, dish.dish.weight));
        });

        // const data = menu.daily_menus.length && menu.daily_menus[0].daily_menu.dishes || [];
        // data.forEach((item: any) => {
        //     this.processWeight(item.dish);
        //     this.processPrice(item.dish);
        //     result.push(new Dish(item.dish.dish_id, item.dish.name, item.dish.price, item.dish.weight));
        // });

        return result;
    }

    public processDelphineMenu(menu: string): Dish[] {
        if (!menu) {
            return [];
        }
        const splitMenu = menu.split("\n").splice(1, 100);

        return splitMenu.map((foodName, i) => {
            return new Dish("", foodName, i === 0 ? undefined : "4.40€");
        });

    }

    private processZomatoPrice(dish: any): void {
        const priceResult = dish.name.match(Config.PRICE_REGEXP);
        if (priceResult) {
            dish.price = priceResult[0] + " €";
            dish.name = dish.name.replace(Config.PRICE_REGEXP, " ");
        }
    }

    private processZomatoWeight(dish: any): void {
        const weightResult = dish.name.match(Config.WEIGHT_REGEXP);
        if (weightResult) {
            dish.weight = weightResult[0].replace(/(\/)/g, "")
                .replace(",", ".")
                .trim();

            if (dish.weight.match(/^\d+g$/)) {
                dish.weight = dish.weight.replace("g", " g");
            }
            if (dish.weight.match(/^\d*\.?\d*l$/)) {
                dish.weight = dish.weight.replace("l", " l");
            }
            if (dish.weight) {
                dish.weight = `<strong>${dish.weight}</strong>`;
            }
            dish.name = dish.name.replace(Config.WEIGHT_REGEXP, " ").replace(Config.REGEXP, " ");
        }
    }

    public processFoodooMenu(menu: string[]): Dish[] {
        return [];
    }
}
