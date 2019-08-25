import {Component, Input, OnInit} from "@angular/core";
import {Restaurant} from "../../../shared/models/restaurant.model";
import {RatingService} from "../../../shared/services/rating.service";
import {RestaurantService} from "../../../shared/services/restaurant.service";

@Component({
    selector: "fds-restaurant-list-row",
    templateUrl: "./restaurant-list-row.component.html",
    styleUrls: ["./restaurant-list-row.component.scss"],
    host: {
        style: "display: contents",
    },
})
export class RestaurantListRowComponent implements OnInit {
    @Input() public restaurant: Restaurant;

    public constructor(public readonly restaurantService: RestaurantService,
                       public readonly ratingService: RatingService) {
    }

    public ngOnInit(): void {
        // empty
    }

}
