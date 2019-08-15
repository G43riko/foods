import {Component, Input, OnInit} from "@angular/core";
import {Config} from "../../../appConfig";
import {Restaurant} from "../../../shared/models/restaurant.model";
import {AnalyticsService} from "../../../shared/services/analytics.service";
import {AppService} from "../../../shared/services/app.service";
import {GeoLocationService} from "../../../shared/services/geo-location.service";
import {RatingService} from "../../../shared/services/rating.service";
import {RestaurantService} from "../../../shared/services/restaurant.service";

declare const $;

@Component({
    selector: "app-restaurant-title",
    templateUrl: "./restaurant-title.component.html",
    styleUrls: ["./restaurant-title.component.css"],
})
export class RestaurantTitleComponent implements OnInit {
    @Input() public restaurant: Restaurant;

    public constructor(public readonly appService: AppService,
                       private readonly restaurantService: RestaurantService,
                       private readonly ratingService: RatingService,
                       public readonly getLocationService: GeoLocationService,
                       private readonly analyticsService: AnalyticsService) {
    }

    public ngOnInit(): void {
    }

    public showMap(restaurant: Restaurant): void {
        const modal = $(".ui.modal.maps");
        const url = `https://www.google.com/maps/embed/v1/place?&q=${restaurant.coordinates.lat},${restaurant.coordinates.long}&zoom=18&key=${Config.GOOGLE_MAPS_API_EMBED_KEY}`;
        modal.find("iframe").attr("src", url);
        this.analyticsService.openMap(restaurant.key);
        modal.modal("show");
    }
}
