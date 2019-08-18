import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

export interface Coord {
    lat: number;
    long: number;
}

@Injectable({
    providedIn: "root",
})
export class GeoLocationService {
    public readonly coordinates: BehaviorSubject<Coord> = new BehaviorSubject<Coord>(null);
    private readonly id: number;

    public constructor() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: Position) => {
                this.coordinates.next({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                });
            }, (error: PositionError) => this.coordinates.error(error));
            // this.id = navigator.geolocation.watchPosition((position: Position) => {
            //     this.coordinates.next({
            //         lat: position.coords.latitude,
            //         long: position.coords.longitude,
            //     });
            // }, (error: PositionError) => this.coordinates.error(error));
        } else {
            this.coordinates.error("Geolocation is not supported by this browser.");
        }
    }

    public cleanUp(): void {
        if (this.id) {
            navigator.geolocation.clearWatch(this.id);
        }
    }

    public distanceAsync(coordinates: Coord): Observable<number> {
        if (!coordinates) {
            return of(0);
        }

        return this.coordinates.pipe(map<Coord, number>((myCoordinates: Coord) => {
            if (!myCoordinates) {
                return 0;
            }

            return this.calcCrow(myCoordinates.lat, myCoordinates.long, coordinates.lat, coordinates.long);
        }));
    }

    public distanceFrom(coordinates?: Coord | null): number {
        return this.distance(coordinates, this.coordinates.value);
    }

    public distance(coordinates?: Coord | null, myCoordinates?: Coord | null): number {
        if (!coordinates || !myCoordinates) {
            return 0;
        }

        return this.calcCrow(myCoordinates.lat, myCoordinates.long, coordinates.lat, coordinates.long);
    }

    private calcCrow(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const toRad = (value: number): number => {
            return value * Math.PI / 180;
        };
        const R = 6371; // km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }
}
