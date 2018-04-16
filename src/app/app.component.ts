import {Component, OnInit} from "@angular/core";
import {FoodsService} from "./foods.service";
import {removeAccentedCharacters} from "./string-utils";
import {FoodData} from "./foodData";
import {RestaurantData} from "./restaurantsData";
import {StatsService} from "./stats.service";

declare const $;
const priceRegex = /\d+(,|.)?\d+ ?[gl][ \/]?/;
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    public highlightTypes: any = FoodData;
    public searchKey = "";
    public restaurants = RestaurantData;
    public dailyMenus: any = {};
    public highlight = this.highlightTypes[0];

    public constructor(private foodsService: FoodsService, private statsService: StatsService) {
    }

    private processDailyMenu(menu: any) {
        const result = menu.daily_menus.length && menu.daily_menus[0].daily_menu.dishes || [];
        result.forEach((item) => {
            const priceResult = item.dish.name.match(priceRegex);
            if (priceResult) {
                const price = "<b>" + priceResult[0].replace(/(\/)/g, "").replace(",", ".").trim() + "</b>";
                item.dish.name = price + ": " + item.dish.name.replace(priceRegex, "");
            }
        });
        return result;
    }

    public isBold(key: string) {
        return key.startsWith("Polievky") ||
            key.startsWith("Hlavné") ||
            key.startsWith("Špeciálita") ||
            key.startsWith("Zeleninové ");
    }

    public isHighlighted(title: string): boolean {
        if (this.isBold(title)) {
            return false;
        }
        let highlight = false;
        if (this.highlight.include.some(item => removeAccentedCharacters(title).toLowerCase().indexOf(item) >= 0) &&
            this.highlight.exclude.every(item => removeAccentedCharacters(title).toLowerCase().indexOf(item) < 0)) {
            highlight = true;
        }
        return highlight;
    }

    private  setAutocomplete(): void {
        const keywords = ["menu", "ponuka", "astra", "delfin", "extra", "porcia", "with", "baby", "chicken", "cream",
            "vegetable", "grilled", "stala", "pon", "utor", "stre", "stvrtok", "pia", "spinach", "boiled", "potatoes",
            "pork", "rice", "baked", "dna"];
        const a = document.getElementById("foodContent")
            .innerText
            .split(/[ \n\-/,]/g)
            .filter(e => e &&
                e.length > 3 &&
                isNaN(parseFloat(e)) &&
                !removeAccentedCharacters(e.toLowerCase()).match(new RegExp("(" + keywords.join("|") + ")")))
            .map(e => e.trim());

        const res = [];
        a.forEach(e => {
            const key = removeAccentedCharacters(e.toLowerCase());
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
