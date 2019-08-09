import {Component, Input, OnInit} from "@angular/core";
import {Dish} from "../../shared/models/dish.model";
import {Food} from "../../shared/models/food.model";
import {Restaurant} from "../../shared/models/restaurant.model";
import {AppService} from "../../shared/services/app.service";
import {AuthService} from "../../shared/services/auth.service";
import {RatingService} from "../../shared/services/rating.service";
import {FoodUtils} from "../../shared/utils/food-utils";
import {StringUtils} from "../../shared/utils/StringUtils";

@Component({
    selector: "app-food-row",
    templateUrl: "./food-row.component.html",
    styleUrls: ["./food-row.component.scss"],
})
export class FoodRowComponent implements OnInit {
    @Input() public dish: Dish;
    @Input() public highlight: Food = new Food();
    @Input() public restaurant: Restaurant;

    public constructor(public readonly appService: AppService,
                       public readonly ratingService: RatingService,
                       public readonly authService: AuthService) {
    }

    public ngOnInit(): void {
        // empty
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
    private openImages(elementWrapper: HTMLSpanElement): void {
        window.open(this.getGoogleImagesLinkFor(elementWrapper.innerText), "_blank");
    }

    private getGoogleImagesLinkFor(dailyMenu: string): string {
        return `https://www.google.sk/search?q=${encodeURIComponent(dailyMenu)}&tbm=isch`;
    }
}
