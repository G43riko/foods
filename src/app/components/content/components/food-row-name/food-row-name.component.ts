import {Component, Input} from "@angular/core";
import {Dish} from "../../../../shared/models/dish.model";
import {Restaurant} from "../../../../shared/models/restaurant.model";
import {AnalyticsService} from "../../../../shared/services/analytics.service";
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
                       private readonly analyticsService: AnalyticsService,
                       public readonly foodService: FoodsService) {
    }

    private openImages(elementWrapper: HTMLSpanElement): void {
        this.analyticsService.showImages(elementWrapper.innerText);
        window.open(this.getGoogleImagesLinkFor(elementWrapper.innerText), "_blank");
    }

    private getGoogleImagesLinkFor(dailyMenu: string): string {
        return `https://www.google.sk/search?q=${encodeURIComponent(dailyMenu)}&tbm=isch`;
    }

}
