import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Food} from "../../shared/models/food.model";
import {Restaurant} from "../../shared/models/restaurant.model";
import {FoodUtils} from "../../shared/utils/food-utils";
import {StringUtils} from "../../shared/utils/StringUtils";
import {AppService} from "../../shared/services/app.service";

@Component({
    selector: "app-restaurant-foods",
    templateUrl: "./restaurant-foods.component.html",
    styleUrls: ["./restaurant-foods.component.scss"],
})
export class RestaurantFoodsComponent implements OnChanges{
    @Input() public highlight: Food = new Food();
    @Input() public searchKey: string;
    @Input() public dailyMenus: any;
    @Input() public restaurant: Restaurant = new Restaurant();

    public constructor(public readonly appService: AppService) {
    }

    public isBold(key: string): boolean {
        return FoodUtils.isBold(key);
    }

    public isHighlighted(title: string): boolean {
        if (FoodUtils.isBold(title)) {
            return false;
        }

        return this.highlight.include.some((item) => StringUtils.removeAccentedCharacters(title).toLowerCase().indexOf(item) >= 0) &&
               this.highlight.exclude.every((item) => StringUtils.removeAccentedCharacters(title).toLowerCase().indexOf(item) < 0);
    }

    public ngOnChanges(changes: SimpleChanges): void {
    }

}
