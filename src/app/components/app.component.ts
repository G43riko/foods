import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {forkJoin} from "rxjs/internal/observable/forkJoin";
import {Dish} from "../shared/models/dish.model";
import {Restaurant} from "../shared/models/restaurant.model";
import {AppService} from "../shared/services/app.service";
import {FoodsRestService} from "../shared/services/foods.rest.service";
import {FoodsService} from "../shared/services/foods.service";
import {NotificationService} from "../shared/services/notification.service";
import {ParserService} from "../shared/services/parser.service";
import {StatsService} from "../shared/services/stats.service";
import {StringUtils} from "../shared/utils/StringUtils";

declare const $: any;

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnChanges {
    public restaurants: Restaurant[] = [];
    public counter = 0;
    public dailyMenus: { [key: string]: Dish[] } = {};

    public constructor(private readonly foodsRestService: FoodsRestService,
                       private readonly parserService: ParserService,
                       private readonly sanitizer: DomSanitizer,
                       private readonly notificationService: NotificationService,
                       public readonly appService: AppService,
                       private readonly foodsService: FoodsService,
                       private readonly statsService: StatsService) {
    }

    private setAutocomplete(): void {
        const keywords = ["menu", "ponuka", "astra", "delfin", "extra", "porcia", "with", "baby", "chicken", "cream",
            "vegetable", "grilled", "stala", "pon", "utor", "stre", "stvrtok", "pia", "spinach", "boiled", "potatoes",
            "pork", "rice", "baked", "dna"];
        const aElement = document.getElementById("foodContent");

        const a = !aElement ? [] : aElement.innerText.split(/[ \n\-/,]/g)
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
        this.counter++;
        this.restaurants = selectedRestaurants;
        this.loadDailyMenus();
    }

    public ngOnInit(): void {
        this.statsService.setVisit();
        $(".ui.sidebar.restaurants").sidebar("attach events", ".item.opener.restaurants");
        $(".ui.sidebar.options").sidebar("attach events", ".item.opener.options");
    }

    private loadDailyMenus(): void {
        const actualRestaurants = this.restaurants.filter((restaurant) => !this.dailyMenus[restaurant.key] && !restaurant.menuLink);
        const data = actualRestaurants.map((restaurant) => this.foodsRestService.getZomatoFood(restaurant.id));

        forkJoin(data).subscribe(((results) => {
            this.statsService.storeMenu(results);
            results.forEach((result, index) => {
                this.dailyMenus[actualRestaurants[index].key] = this.foodsService.processZomatoMenu(result);
            });
            setTimeout(() => this.setAutocomplete(), 10);
            $(".checkbox").checkbox();
            /*
            this.parserService.parseDelfinMenus().then((menu) => {
                this.dailyMenus.delphine = this.foodsService.processDelphineMenu(menu);
            }).catch((e) => {
                console.error(e);
            }).finally(() => {
                setTimeout(() => this.setAutocomplete(), 10);
                $(".checkbox").checkbox();
            });
            */

            // this.setSlider();
        }), (error) => {
            this.notificationService.showErrorMessage("Error while getting menus from zommato api: ", error);
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        console.log("changes: ", changes);
    }
}
