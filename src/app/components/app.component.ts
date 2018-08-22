import {Component, OnInit} from "@angular/core";
import {Dish} from "../shared/models/dish.model";
import {Restaurant} from "../shared/models/restaurant.model";
import {FoodsRestService} from "../shared/services/foods.rest.service";
import {FoodsService} from "../shared/services/foods.service";
import {ParserService} from "../shared/services/parser.service";
import {StatsService} from "../shared/services/stats.service";
import {StringUtils} from "../shared/utils/StringUtils";

declare const $: any;

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    public restaurants: Restaurant[] = [];
    public readonly dailyMenus: { [key: string]: Dish[] } = {};

    public constructor(private readonly foodsRestService: FoodsRestService,
                       private readonly parserService: ParserService,
                       private readonly foodsService: FoodsService,
                       private readonly statsService: StatsService) {
    }

    private setAutocomplete(): void {
        const keywords = ["menu", "ponuka", "astra", "delfin", "extra", "porcia", "with", "baby", "chicken", "cream",
            "vegetable", "grilled", "stala", "pon", "utor", "stre", "stvrtok", "pia", "spinach", "boiled", "potatoes",
            "pork", "rice", "baked", "dna"];
        const aElement = document.getElementById("foodContent");

        const a = !aElement ? [] : aElement.innerText
            .split(/[ \n\-/,]/g)
            .filter((e) => e &&
                e.length > 3 &&
                isNaN(parseFloat(e)) &&
                !StringUtils.removeAccentedCharacters(e.toLowerCase()).match(new RegExp("(" + keywords.join("|") + ")")))
            .map((e) => e.trim());

        const res: {
            key: string,
            value: string,
            count: number,
        }[] = [];
        a.forEach((e: string) => {
            const key: string = StringUtils.removeAccentedCharacters(e.toLowerCase());
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

    public onRestaurantChanges(selectedRestaurants: Restaurant[]): void {
        this.restaurants = selectedRestaurants;
        this.loadDailyMenus();
    }

    public ngOnInit(): void {
        this.statsService.setVisit();
    }

    private loadDailyMenus(): void {
        const data = this.restaurants
                         .filter((restaurant) => !this.dailyMenus[restaurant.key])
                         .map((restaurant) => this.foodsRestService.getZomatoFood(restaurant.id));
        Promise.all(data).then((results) => {
            this.statsService.storeMenu(results);
            results.forEach((result, index) => {
                this.dailyMenus[this.restaurants[index].key] = this.foodsService.processZomatoMenu(result);
            });
            this.parserService.parseDelfinMenus().then((menu) => {
                this.dailyMenus.delphine = this.foodsService.processDelphineMenu(menu);
                setTimeout(() => this.setAutocomplete(), 10);
                $(".checkbox").checkbox();
            }).catch((e) => {
                console.error(e);
                setTimeout(() => this.setAutocomplete(), 10);
            });

            // this.setSlider();
        });
    }
}
