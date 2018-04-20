import {Component, OnInit} from "@angular/core";
import {FoodsService} from "../services/foods.service";
import {removeAccentedCharacters} from "../utils/string-utils";
import {RestaurantData} from "../../data/restaurantsData";
import {StatsService} from "../services/stats.service";
import {Restaurant} from "../models/restaurant.model";
import {Config} from "../appConfig";

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
                       private statsService: StatsService) {
    }

    private processDailyMenu(menu: any): any[] {
        const result = menu.daily_menus.length && menu.daily_menus[0].daily_menu.dishes || [];
        result.forEach((item: any) => {
            const priceResult = item.dish.name.match(Config.PRICE_REGEXP);
            if (priceResult) {
                const price = "<b>" + priceResult[0].replace(/(\/)/g, "").replace(",", ".").trim() + "</b>";
                item.dish.name = price + ": " + item.dish.name.replace(Config.PRICE_REGEXP, "");
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
        $(".ui.multiple.dropdown").find(".menu").append(innerHtml);
        $(".ui.multiple.dropdown").dropdown();
    }

    public ngOnInit(): void {
        this.statsService.setVisit();
        const data = this.restaurants.map((restaurant) => this.foodsService.getZomatoFood(restaurant.id));
        Promise.all(data).then((results) => {
            this.statsService.storeMenu(results);
            results.forEach((result, index) => {
                this.dailyMenus[this.restaurants[index].key] = this.processDailyMenu(result);
            });
            setTimeout(() => this.setAutocomplete(), 10);

            // this.setSlider();
        });
    }
}
