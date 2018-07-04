import {Component, OnInit} from "@angular/core";
import {FoodsService} from "../services/foods.service";
import {removeAccentedCharacters} from "../utils/string-utils";
import {RestaurantData} from "../../data/restaurantsData";
import {StatsService} from "../services/stats.service";
import {Restaurant} from "../models/restaurant.model";
import {Config} from "../appConfig";
import {ParserService} from "../services/parser.service";

declare const $: any;

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    public readonly restaurants: Restaurant[] = RestaurantData;
    public readonly dailyMenus: any = {};

    public constructor(private foodsService: FoodsService,
                       private parserService: ParserService,
                       private statsService: StatsService) {
    }

    private processDelphineMenu(menu: string): any[] {
        const splitMenu = menu.split("\n").splice(1, 100);
        return splitMenu.map((foodName, i) => {
            return {
                dish: {
                    dish_id: NaN,
                    name: foodName,
                    price: i === 0 ? undefined : "4.40€",
                }
            };
        });

    }

    private processDailyMenu(menu: any): any[] {
        const result = menu.daily_menus.length && menu.daily_menus[0].daily_menu.dishes || [];
        result.forEach((item: any) => {
            const weightResult = item.dish.name.match(Config.WEIGHT_REGEXP);
            if (weightResult) {
                const price = "<b>" + weightResult[0].replace(/(\/)/g, "").replace(",", ".").trim() + "</b>";
                item.dish.name = price + ": " + item.dish.name.replace(Config.WEIGHT_REGEXP, "");
            }

            const priceResult = item.dish.name.match(Config.PRICE_REGEXP);
            if (priceResult) {
                item.dish.price = priceResult[0] + " €";
                item.dish.name = item.dish.name.replace(Config.WEIGHT_REGEXP, "");
            }
        });
        return result;
    }


    private setAutocomplete(): void {
        const keywords = ["menu", "ponuka", "astra", "delfin", "extra", "porcia", "with", "baby", "chicken", "cream",
            "vegetable", "grilled", "stala", "pon", "utor", "stre", "stvrtok", "pia", "spinach", "boiled", "potatoes",
            "pork", "rice", "baked", "dna"];
        const aElement = document.getElementById("foodContent");

        const a = !aElement ? [] : aElement.innerText
            .split(/[ \n\-/,]/g)
            .filter(e => e &&
                e.length > 3 &&
                isNaN(parseFloat(e)) &&
                !removeAccentedCharacters(e.toLowerCase()).match(new RegExp("(" + keywords.join("|") + ")")))
            .map(e => e.trim());

        const res: {
            key: string,
            value: string,
            count: number,
        }[] = [];
        a.forEach((e: string) => {
            const key: string = removeAccentedCharacters(e.toLowerCase());
            const found = res.find((item) => item.key === key);
            if (found) {
                found.count++;
            } else {
                res.push({key, value: e, count: 1});
            }
        });
        res.sort((b, c) => c.count - b.count);
        let innerHtml = "";
        res.forEach((e) => {
            innerHtml += `<div class="item" data-value="${e.key}">${e.value + " (" + e.count + ")"}</div>`;
        });
        $(".ui.multiple.dropdown").dropdown().find(".menu").append(innerHtml);
    }

    public ngOnInit(): void {
        this.statsService.setVisit();
        const data = this.restaurants.map((restaurant) => this.foodsService.getZomatoFood(restaurant.id));


        Promise.all(data).then((results) => {
            this.statsService.storeMenu(results);
            results.forEach((result, index) => {
                this.dailyMenus[this.restaurants[index].key] = this.processDailyMenu(result);
            });
            this.parserService.parseDelfinMenus().then((menu) => {
                this.dailyMenus["delphine"] = this.processDelphineMenu(menu);
                console.log("this.dailyMenus: ", this.dailyMenus);
                setTimeout(() => this.setAutocomplete(), 10);
            });

            // this.setSlider();
        });
    }
}
