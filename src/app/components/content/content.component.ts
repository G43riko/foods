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
    selector: "fds-content",
    templateUrl: "./content.component.html",
    styleUrls: ["./content.component.scss"],
    providers: [
        RestaurantService,
    ],
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

    public ngOnInit(): void {
        // empty
    }

    private loadDailyMenus(): void {
        const actualRestaurants = this.restaurants.filter((restaurant) => !this.dailyMenus[restaurant.key] && !restaurant.menuLink /*&& !restaurant.smeRestaurantsLink*/);
        actualRestaurants.forEach((restaurant) => {
            this.foodsFirebaseService.getZomatoFood(restaurant).subscribe((result) => {
                // If menu is not available on zomato
                if (result === 400) {
                    restaurant.forceIFrame = true;
                    this.dailyMenus[restaurant.key] = [];

                    return;
                }

                // if menu is empty array;
                if (result && (!Array.isArray(result.daily_menus) || result.daily_menus.length === 0)) {
                    restaurant.forceIFrame = true;
                    this.dailyMenus[restaurant.key] = [];

                    return;
                }
                this.dailyMenus[restaurant.key] = this.foodsService.processZomatoMenu(result);
            }, (error) => {
                this.notificationService.showErrorMessage("Error while getting menus from zommato api: ", error);
            });
        });
        // this.foodsFirebaseService.getZomatoFoods(actualRestaurants).subscribe((results) => {
        //     this.statsService.storeMenu(results);
        //     console.log(results);
        //     results.forEach((result, index) => {
        //         this.dailyMenus[actualRestaurants[index].key] = this.foodsService.processZomatoMenu(result);
        //     });
        //     $(".checkbox").checkbox();
        //
        // }, (error) => {
        //     this.notificationService.showErrorMessage("Error while getting menus from zomato api: ", error);
        // });

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
}
