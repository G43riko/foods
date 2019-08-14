import {Injectable} from "@angular/core";
import {Restaurant} from "../models/restaurant.model";
import {Coord, GeoLocationService} from "./geo-location.service";
import {RatingService} from "./rating.service";

@Injectable({
    providedIn: "root",
})
export class RestaurantService {

    public constructor(private readonly geoLocationService: GeoLocationService,
                       private readonly ratingService: RatingService) {
    }

    public getDistance(coordinates: Coord): string {
        const distance = this.geoLocationService.distanceFrom(coordinates);
        if (!distance) {
            return "Vzdialenosť sa nedá vyrátať";
        }

        if (distance < 1) {
            return (distance * 1000).toFixed(0) + " metrov od vás";
        }

        return distance.toFixed(2) + " km od vás";
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
