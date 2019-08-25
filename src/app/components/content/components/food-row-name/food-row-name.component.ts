import {Component, Input} from "@angular/core";
import {Dish} from "../../../../shared/models/dish.model";
import {Restaurant} from "../../../../shared/models/restaurant.model";
import {AppService} from "../../../../shared/services/app.service";
import {FoodsService} from "../../../../shared/services/foods.service";

@Component({
    selector: "fds-food-row-name",
    templateUrl: "./food-row-name.component.html",
    styleUrls: ["./food-row-name.component.scss"],
})
export class FoodRowNameComponent {
    @Input() public dish: Dish;
    @Input() public restaurant: Restaurant;

    public constructor(public readonly appService: AppService,
                       public readonly foodService: FoodsService) {
    }

}
