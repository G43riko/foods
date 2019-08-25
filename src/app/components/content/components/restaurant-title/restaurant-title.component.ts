import {Component, Input, OnInit} from "@angular/core";
import {Config} from "../../../../appConfig";
import {Restaurant} from "../../../../shared/models/restaurant.model";
import {AnalyticsService} from "../../../../shared/services/analytics.service";
import {AppService} from "../../../../shared/services/app.service";
import {GeoLocationService} from "../../../../shared/services/geo-location.service";
import {RatingService} from "../../../../shared/services/rating.service";
import {RestaurantService} from "../../../../shared/services/restaurant.service";

declare const $;

@Component({
    selector: "fds-restaurant-title",
    templateUrl: "./restaurant-title.component.html",
    styleUrls: ["./restaurant-title.component.scss"],
    providers: [
        RestaurantService,
    ],
})
export class RestaurantTitleComponent implements OnInit {
    @Input() public restaurant: Restaurant;

    public constructor(public readonly appService: AppService,
                       public readonly restaurantService: RestaurantService,
                       public readonly ratingService: RatingService,
                       public readonly getLocationService: GeoLocationService,
                       private readonly analyticsService: AnalyticsService) {
    }

    public ngOnInit(): void {
        // empty
    }

    public showMap(restaurant: Restaurant): void {
        const modal = $(".ui.modal.maps");
        const url = `https://www.google.com/maps/embed/v1/place?&q=${restaurant.address.latitude},${restaurant.address.longitude}&zoom=18&key=${Config.GOOGLE_MAPS_API_EMBED_KEY}`;
        modal.find("iframe").attr("src", url);
        this.analyticsService.openMap(restaurant.key);
        modal.modal("show");
    }
}
