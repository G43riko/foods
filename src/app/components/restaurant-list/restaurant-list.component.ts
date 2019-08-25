import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/internal/Observable";
import {Restaurant} from "../../shared/models/restaurant.model";
import {RestaurantService} from "../../shared/services/restaurant.service";

@Component({
    selector: "fds-restaurant-list",
    templateUrl: "./restaurant-list.component.html",
    styleUrls: ["./restaurant-list.component.scss"],
})
export class RestaurantListComponent implements OnInit {
    public readonly restaurants$: Observable<Restaurant[]>;

    public constructor(restaurantService: RestaurantService) {
        this.restaurants$ = restaurantService.getRestaurantData();
    }

    public ngOnInit(): void {
        // empty
    }

}
