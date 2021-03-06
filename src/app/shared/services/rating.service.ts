import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {switchMap, throttleTime} from "rxjs/operators";
import {User} from "../interfaces/user.interface";
import {Dish} from "../models/dish.model";
import {Restaurant} from "../models/restaurant.model";
import {FirebaseRestaurantsData, FirebaseService} from "./firebase.service";

@Injectable({
    providedIn: "root",
})
export class RatingService {
    private readonly cache: FirebaseRestaurantsData = {};
    private favourite: { [key: string]: number } = {};

    public constructor(private readonly firebaseService: FirebaseService) {
        const collection = firebaseService.getRestaurants();
        collection.valueChanges().pipe(
            throttleTime(10000),
            switchMap(() => collection.get()),
        ).subscribe((restaurants) => {
            restaurants.forEach((restaurant) => {
                this.cache[restaurant.id] = restaurant.data();
            });
        });
        this.getNumberOfFavorites().subscribe((data) => {
            this.favourite = data;
        });
    }

    public getLikesFor(restaurant: Restaurant): number {
        return this.favourite[restaurant.key] || 0;
    }

    public getTotalLikes(restaurant: Restaurant): number {
        if (!this.cache[restaurant.key]) {
            return 0;
        }
        const voters = [];
        Object.values(this.cache[restaurant.key]).forEach((menu) => voters.push(...menu));

        return voters.length;
    }

    public getLikedUsers(restaurant: Restaurant): number {
        if (!this.cache[restaurant.key]) {
            return 0;
        }
        const voters = [];
        Object.values(this.cache[restaurant.key]).forEach((menu) => voters.push(...menu));

        return new Set(voters).size;
    }

    public getLikes(dish: Dish, restaurant: Restaurant): number {
        if (!this.isCached(dish, restaurant)) {
            return 0;
        }

        return this.cache[restaurant.key][dish.name].length;
    }

    public like(user: User, dish: Dish, restaurant: Restaurant): Promise<boolean> {
        const query = this.firebaseService.getRestaurant(restaurant);
        this.setCache(user, dish, restaurant, true);

        return new Promise<boolean>((success, reject) => {
            query.get().subscribe((snapshot) => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    if (data[dish.name]) {
                        if (data[dish.name].includes(user.email)) {
                            success(false);

                            return;
                        }
                        data[dish.name].push(user.email);

                        query.set({
                            [dish.name]: data[dish.name],
                        }, {merge: true}).then(() => success(true)).catch(reject);
                    } else {
                        query.set({
                            [dish.name]: [user.email],
                        }, {merge: true}).then(() => success(true)).catch(reject);
                    }
                } else {
                    query.set({
                        [dish.name]: [user.email],
                    }).then(() => success(true)).catch(reject);
                }
            });
        });
    }

    public unlike(user: User, dish: Dish, restaurant: Restaurant): Promise<boolean> {
        const query = this.firebaseService.getRestaurant(restaurant);
        this.setCache(user, dish, restaurant, false);

        return new Promise<boolean>((success, reject) => {
            query.get().subscribe((snapshot) => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    if (data[dish.name]) {
                        data[dish.name].splice(data[dish.name].indexOf(user.email), 1);
                        query.set({
                            [dish.name]: data[dish.name],
                        }, {merge: true}).then(() => success(true)).catch(reject);

                        return;
                    }
                }

                success(false);
            }, reject);
        });
    }

    public isLiked(user: User, dish: Dish, restaurant: Restaurant): boolean {
        if (!user || !dish) {
            return false;
        }

        return this.getCache(user, dish, restaurant);
    }

    private getNumberOfFavorites(): Observable<{ [key: string]: number }> {
        return new Observable((subject) => {
            this.firebaseService.getUsers().valueChanges().subscribe((data) => {
                const result = {};
                data.forEach((doc: any) => {
                    const likeRestaurants = doc && doc.config && doc.config.selectedRestaurants || [];
                    likeRestaurants.forEach((restaurant) => {
                        if (restaurant in result) {
                            result[restaurant]++;
                        } else {
                            result[restaurant] = 1;
                        }
                    });
                });
                subject.next(result);
                // subject.complete();
            });
        });
    }

    private setCache(user: User, dish: Dish, restaurant: Restaurant, liked: boolean): void {
        if (!this.cache[restaurant.key]) {
            this.cache[restaurant.key] = {};
        }
        if (!this.cache[restaurant.key][dish.name]) {
            if (liked) {
                this.cache[restaurant.key][dish.name] = [user.email];
            }
        } else {
            if (liked) {
                this.cache[restaurant.key][dish.name].push(user.email);
            } else {
                this.cache[restaurant.key][dish.name].splice(this.cache[restaurant.key][dish.name].indexOf(user.email), 1);
            }
        }
    }

    private isCached(dish: Dish, restaurant: Restaurant): boolean {
        if (!restaurant) {
            return false;
        }
        if (!this.cache[restaurant.key]) {
            return false;
        }

        return !!this.cache[restaurant.key][dish.name];
    }

    private getCache(user: User, dish: Dish, restaurant: Restaurant): boolean {
        if (!this.isCached(dish, restaurant)) {
            return false;
        }

        return this.cache[restaurant.key][dish.name].includes(user.email);
    }

}
