import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {Subscription} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {Restaurant} from "../../shared/models/restaurant.model";
import {AppConfiguration, AppService} from "../../shared/services/app.service";
import {AuthService} from "../../shared/services/auth.service";
import {FoodsFirebaseService} from "../../shared/services/foods-firebase.service";
import {RatingService} from "../../shared/services/rating.service";
import {RestaurantService} from "../../shared/services/restaurant.service";

@Component({
    selector: "fds-restaurant-selector",
    templateUrl: "./restaurant-selector.component.html",
    styleUrls: ["./restaurant-selector.component.scss"],
})
export class RestaurantSelectorComponent implements OnInit, OnDestroy {
    @Output("restaurantsChange") public readonly restaurantsChange: EventEmitter<Restaurant[]> = new EventEmitter<Restaurant[]>();
    public readonly restaurants: Restaurant[] = [];
    public readonly selectedRestaurants: Restaurant[] = [];
    private subscription: Subscription;

    public constructor(public readonly appService: AppService,
                       public readonly foodsFirebaseService: FoodsFirebaseService,
                       private readonly restaurantService: RestaurantService,
                       public readonly ratingService: RatingService,
                       public readonly authService: AuthService) {
    }

    public ngOnInit(): void {
        this.subscription = this.appService
            .configuration
            .pipe(switchMap((conf) => this.restaurantService.getRestaurantData().pipe(map((rest) => [conf, rest]))))
            .subscribe(([configuration, restaurants]: [AppConfiguration, Restaurant[]]) => {
                this.setRestaurants(configuration.selectedRestaurants, restaurants);
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

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private setRestaurants(selectedRestaurantsKeys: string[], restaurantList: Restaurant[]): void {
        this.selectedRestaurants.splice(0, this.selectedRestaurants.length);
        this.restaurants.splice(0, this.restaurants.length);
        restaurantList.forEach((restaurant: Restaurant) => {
            const index = selectedRestaurantsKeys.indexOf(restaurant.key);
            if (index >= 0) {
                this.selectedRestaurants[index] = restaurant;
            } else {
                this.restaurants.push(restaurant);
            }
        });
    }
}
