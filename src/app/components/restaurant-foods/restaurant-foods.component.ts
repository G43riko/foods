import {Component, Input, OnInit} from "@angular/core";
import {Restaurant} from "../../models/restaurant.model";
import {FoodUtils} from "../../utils/food-utils";
import {removeAccentedCharacters} from "../../utils/string-utils";
import {Food} from "../../models/food.model";

@Component({
    selector: "app-restaurant-foods",
    templateUrl: "./restaurant-foods.component.html",
    styleUrls: ["./restaurant-foods.component.scss"]
})
export class RestaurantFoodsComponent implements OnInit {
    @Input() highlight: Food = new Food();
    @Input() searchKey: string;
    @Input() dailyMenus: any;
    @Input() restaurant: Restaurant = new Restaurant();

    public constructor() {
    }

    public ngOnInit() {
    }

    public isBold(key: string): boolean {
        return FoodUtils.isBold(key);
    }


    public isHighlighted(title: string): boolean {
        if (FoodUtils.isBold(title)) {
            return false;
        }
        let highlight = false;
        if (this.highlight.include.some(item => removeAccentedCharacters(title).toLowerCase().indexOf(item) >= 0) &&
            this.highlight.exclude.every(item => removeAccentedCharacters(title).toLowerCase().indexOf(item) < 0)) {
            highlight = true;
        }
        return highlight;
    }

}
