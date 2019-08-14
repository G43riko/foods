import {Injectable} from "@angular/core";
import {Coord, GeoLocationService} from "./geo-location.service";

@Injectable({
    providedIn: "root",
})
export class RestaurantService {

    public constructor(private readonly geoLocationService: GeoLocationService) {
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
}
