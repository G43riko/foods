import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Food} from "../../../../shared/models/food.model";
import {Restaurant} from "../../../../shared/models/restaurant.model";
import {AppService} from "../../../../shared/services/app.service";

@Component({
    selector: "fds-restaurant-foods",
    templateUrl: "./restaurant-foods.component.html",
    styleUrls: ["./restaurant-foods.component.scss"],
})
export class RestaurantFoodsComponent implements OnInit {
    @Input() public highlight: Food = new Food();
    @Input() public searchKey: string;
    @Input() public dailyMenus: any;
    @Input() public restaurant: Restaurant = new Restaurant();

    public constructor(public readonly appService: AppService) {
    }

    public ngOnInit(): void {
        // empty
    }
}
