import {Component, Input, OnInit} from "@angular/core";
import {finalize} from "rxjs/operators";
import {Dish} from "../../shared/models/dish.model";
import {Food} from "../../shared/models/food.model";
import {Restaurant} from "../../shared/models/restaurant.model";
import {AppService} from "../../shared/services/app.service";
import {FoodsFirebaseService} from "../../shared/services/foods-firebase.service";
import {FoodsRestService} from "../../shared/services/foods.rest.service";
import {FoodsService} from "../../shared/services/foods.service";
import {Coord, GeoLocationService} from "../../shared/services/geo-location.service";
import {NotificationService} from "../../shared/services/notification.service";
import {StatsService} from "../../shared/services/stats.service";

declare const $: any;

@Component({
    selector: "app-content",
    templateUrl: "./content.component.html",
    styleUrls: ["./content.component.scss"],
})
export class ContentComponent implements OnInit {
    public counter = 0;
    public dailyMenus: { [key: string]: Dish[] } = {};
    public restaurants: Restaurant[] = [];
    @Input() public searchKey: string;
    @Input() public highlight: Food;

    public constructor(private readonly foodsRestService2: FoodsRestService,
                       private readonly foodsRestService: FoodsFirebaseService,
                       private readonly notificationService: NotificationService,
                       private readonly getLocationService: GeoLocationService,
                       public readonly appService: AppService,
                       private readonly foodsService: FoodsService,
                       private readonly statsService: StatsService) {
    }

    public onRestaurantChanges(selectedRestaurants: Restaurant[]): void {
        this.counter++;
        this.restaurants = selectedRestaurants;
        this.loadDailyMenus();
    }

    public getDistance(coordinates: Coord): string {
        const distance = this.getLocationService.distance(coordinates);
        if (!distance) {
            return "Vzdialenosť sa nedá vyrátať";
        }

        if (distance < 1) {
            return (distance * 1000) + " metrov od vás";
        }

        return distance + " km od vás";
    }

    private loadDailyMenus(): void {
        const actualRestaurants = this.restaurants.filter((restaurant) => !this.dailyMenus[restaurant.key] && !restaurant.menuLink);
        this.foodsRestService.getZomatoFoods(actualRestaurants.map((restaurant) => restaurant.id))
                             .subscribe((results) => {
            this.statsService.storeMenu(results);
            results.forEach((result, index) => {
                this.dailyMenus[actualRestaurants[index].key] = this.foodsService.processZomatoMenu(result);
            });
            // setTimeout(() => this.setAutocomplete(), 10);
            $(".checkbox").checkbox();

            // this.parserService.parseDelfinMenus().then((menu) => {
            //     this.dailyMenus.delphine = this.foodsService.processDelphineMenu(menu);
            // }).catch((e) => {
            //     console.error(e);
            // });
            // this.parserService.parseFoodooMenu().then((menu) => {
            //     this.dailyMenus.delphine = this.foodsService.processFoodooMenu(menu);
            // }).catch((e) => {
            //     console.error(e);
            // });
        }, (error) => {
            this.notificationService.showErrorMessage("Error while getting menus from zommato api: ", error);
        });
    }

    public ngOnInit(): void {
        // empty
    }

}
