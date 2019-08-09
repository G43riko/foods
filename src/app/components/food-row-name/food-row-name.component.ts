import {Component, Input} from "@angular/core";
import {Dish} from "../../shared/models/dish.model";
import {Restaurant} from "../../shared/models/restaurant.model";
import {AppService} from "../../shared/services/app.service";
import {FoodUtils} from "../../shared/utils/food-utils";

@Component({
    selector: "app-food-row-name",
    templateUrl: "./food-row-name.component.html",
    styleUrls: ["./food-row-name.component.scss"],
})
export class FoodRowNameComponent{
    @Input() public dish: Dish;
    @Input() public restaurant: Restaurant;

    public constructor(public readonly appService: AppService) {
    }

    public isBold(key: string): boolean {
        return FoodUtils.isBold(key);
    }

    private openImages(elementWrapper: HTMLSpanElement): void {
        window.open(this.getGoogleImagesLinkFor(elementWrapper.innerText), "_blank");
    }

    private getGoogleImagesLinkFor(dailyMenu: string): string {
        return `https://www.google.sk/search?q=${encodeURIComponent(dailyMenu)}&tbm=isch`;
    }

}
