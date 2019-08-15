import {Component, Input} from "@angular/core";
import {Dish} from "../../../shared/models/dish.model";
import {Restaurant} from "../../../shared/models/restaurant.model";
import {AuthService} from "../../../shared/services/auth.service";
import {RatingService} from "../../../shared/services/rating.service";

@Component({
    selector: "app-food-row-likes",
    templateUrl: "./food-row-likes.component.html",
    styleUrls: ["./food-row-likes.component.scss"],
})
export class FoodRowLikesComponent {
    @Input() public dish: Dish;
    @Input() public restaurant: Restaurant;

    public constructor(public readonly ratingService: RatingService,
                       public readonly authService: AuthService) {
    }
}
