import {Injectable} from "@angular/core";
import {Config} from "../../appConfig";
import {Dish} from "../models/dish.model";

@Injectable({
    providedIn: "root",
})
export class FoodsService {
    public processZomatoMenu(menu: any): Dish[] {
        if (!menu) {
            return [];
        }
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
    // public processDelphineMenu(menus: string[]): Dish[] {
        // return menus.map((menu) => new Dish("", menu, ""));
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
            dish.name = dish.name.replace(Config.WEIGHT_REGEXP, " ").replace(Config.REGEXP, " ");
        }
    }

    public processSmeRestaurantMenu(menus: string[]): Dish[] {
        return menus.map((menu) => new Dish("", menu, ""));
        // return menus.map((menu) => {
        //     const dish = new Dish("", menu, "");
        //     this.processZomatoPrice(dish);
        //     this.processZomatoWeight(dish);
        //
        //     return dish;
        // });
    }

    public isBold(dish: Dish): boolean {
        if (!dish || !dish.name) {
            return false;
        }

        return dish.name.startsWith("Polievky") ||
            dish.name.startsWith("Hlavné") ||
            dish.name.startsWith("Šaláty") ||
            dish.name.startsWith("Denné ponuk") ||
            dish.name.startsWith("Uvedené ceny platia") ||
            dish.name.startsWith("Špecialita") ||
            dish.name.startsWith("Zeleninové ");
    }
}
