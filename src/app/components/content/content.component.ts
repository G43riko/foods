import {Component, Input, OnInit} from "@angular/core";
import {Dish} from "../../shared/models/dish.model";
import {Food} from "../../shared/models/food.model";
import {Restaurant} from "../../shared/models/restaurant.model";
import {AppService} from "../../shared/services/app.service";
import {FoodsExternalService} from "../../shared/services/foods-external.service";
import {FoodsFirebaseService} from "../../shared/services/foods-firebase.service";
import {FoodsService} from "../../shared/services/foods.service";
import {NotificationService} from "../../shared/services/notification.service";
import {RestaurantService} from "../../shared/services/restaurant.service";
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

    public constructor(private readonly foodsFirebaseService: FoodsFirebaseService,
                       private readonly notificationService: NotificationService,
                       private readonly restaurantService: RestaurantService,
                       public readonly appService: AppService,
                       private readonly foodsExternalService: FoodsExternalService,
                       private readonly foodsService: FoodsService,
                       private readonly statsService: StatsService) {
    }

    public onRestaurantChanges(selectedRestaurants: Restaurant[]): void {
        this.counter++;
        this.restaurants = selectedRestaurants;
        this.loadDailyMenus();
    }

    private loadDailyMenus(): void {
        const actualRestaurants = this.restaurants.filter((restaurant) => !this.dailyMenus[restaurant.key] && !restaurant.menuLink && !restaurant.smeRestaurantsLink);
        this.foodsFirebaseService.getZomatoFoods(actualRestaurants).subscribe((results) => {
            this.statsService.storeMenu(results);
            results.forEach((result, index) => {
                this.dailyMenus[actualRestaurants[index].key] = this.foodsService.processZomatoMenu(result);
            });
            $(".checkbox").checkbox();

        }, (error) => {
            this.notificationService.showErrorMessage("Error while getting menus from zommato api: ", error);
        });

        // Because on github is HTTPS protocol so you cant call host using HTTP
        // this.restaurants.filter((restaurant) => restaurant.smeRestaurantsLink).forEach((restaurant) => {
        //     this.foodsExternalService.getMenuFromSmeRestaurant(restaurant.smeRestaurantsLink).subscribe((menuRaw) => {
        //         if (!menuRaw) {
        //             this.notificationService.showErrorMessage(`Error while getting menus from smerRestaurant for ${restaurant.name}: `);;
        //
        //             return;
        //         }
        //         this.dailyMenus[restaurant.key] = this.foodsService.processSmeRestaurantMenu(menuRaw);
        //     }, (error) => {
        //         this.notificationService.showErrorMessage(`Error while getting menus from smerRestaurant for ${restaurant.name}: `, error);
        //     });
        // });
    }

    public ngOnInit(): void {
        // empty
    }

}
