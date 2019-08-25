import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs/internal/Observable";
import {Restaurant} from "../models/restaurant.model";
import {AnalyticsService} from "./analytics.service";
import {Address, GeoLocationService} from "./geo-location.service";
import {RatingService} from "./rating.service";

@Injectable()
export class RestaurantService {

    public constructor(private readonly geoLocationService: GeoLocationService,
                       private readonly ratingService: RatingService,
                       private readonly httpClient: HttpClient,
                       private readonly analyticsService: AnalyticsService,
                       private readonly translateService: TranslateService) {
    }

    public getDistance(coordinates: Address): string {
        const distance = this.geoLocationService.distanceFrom(coordinates);
        if (!distance) {
            return this.translateService.instant("distanceCannotBeCalc");
        }

        if (distance < 1) {
            return (distance * 1000).toFixed(0) + " m ";
        }

        return distance.toFixed(2) + " km ";
    }

    public getRestaurantData(): Observable<Restaurant[]> {
        return this.httpClient.get<Restaurant[]>("assets/data/restaurantsData.json");
    }

    public openHomepage(restaurant: Restaurant): void {
        this.analyticsService.openHomepage(restaurant.key);
        window.open(restaurant.homepage, "__blank");
    }

    public getLikedPersons(restaurant: Restaurant): string {
        const result = this.ratingService.getLikedUsers(restaurant);

        if (result === 1) {
            return result + " osoba";
        }
        if (result === 2 || result === 3 || result === 4) {
            return result + " osoby";
        }

        return result + " osôb";
    }
}
