import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {RestaurantData} from "../../../../../data/restaurantsData";
import {Restaurant} from "../../../../shared/models/restaurant.model";
import {AppService} from "../../../../shared/services/app.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {FoodsFirebaseService} from "../../../../shared/services/foods-firebase.service";

@Component({
    selector: "app-restaurant-selector",
    templateUrl: "./restaurant-selector.component.html",
    styleUrls: ["./restaurant-selector.component.scss"],
})
export class RestaurantSelectorComponent implements OnInit {
    @Output("restaurantsChange") public readonly restaurantsChange: EventEmitter<Restaurant[]> = new EventEmitter<Restaurant[]>();
    public readonly restaurants: Restaurant[] = [];
    public readonly selectedRestaurants: Restaurant[] = [];
    public searchKey: string;

    public constructor(public readonly appService: AppService,
                       public readonly foodsFirebaseService: FoodsFirebaseService,
                       public readonly authService: AuthService) {
    }

    public ngOnInit(): void {
        // RestaurantData.forEach((restaurantItem: Restaurant) => {
        //     this.foodsFirebaseService.hasMenu(restaurantItem).pipe(take(1)).subscribe((value) => {
        //         restaurantItem.hasActualMenu = value;
        //         console.log(restaurantItem.name + " menu " + (value ? "má" : "nemá"));
        //         this.cd.detectChanges();
        //     });
        // });

        this.appService.configuration.subscribe((configuration) => {
            this.setRestaurants(configuration.selectedRestaurants);
            this.restaurantsChange.emit(this.selectedRestaurants);
        });
    }

    public drop(event: CdkDragDrop<Restaurant[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
        this.appService.setConfig("selectedRestaurants", this.selectedRestaurants.map((selectedRestaurant) => selectedRestaurant.key));
        this.restaurantsChange.emit(this.selectedRestaurants);
    }

    private setRestaurants(selectedRestaurantsKeys: string[]): void {
        this.selectedRestaurants.splice(0, this.selectedRestaurants.length);
        this.restaurants.splice(0, this.restaurants.length);
        RestaurantData.forEach((restaurant) => {
            const index = selectedRestaurantsKeys.indexOf(restaurant.key);
            if (index >= 0) {
                this.selectedRestaurants[index] = restaurant;
            } else {
                this.restaurants.push(restaurant);
            }
        });
    }
}
