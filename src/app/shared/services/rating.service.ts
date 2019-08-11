import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../interfaces/user.interface";
import {Dish} from "../models/dish.model";
import {Restaurant} from "../models/restaurant.model";

export interface RestaurantsRatingData {
    [restaurantKey: string]: {
        [dishName: string]: string[];
    };
}

@Injectable({
    providedIn: "root",
})
export class RatingService {
    private readonly cache: RestaurantsRatingData = {};

    public constructor(private readonly afs: AngularFirestore) {
        this.afs.collection(`restaurants`).get().subscribe((restaurants) => {
            restaurants.forEach((restaurant) => {
                this.cache[restaurant.id] = restaurant.data();
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
        }
        else {
            if (liked) {
                this.cache[restaurant.key][dish.name].push(user.email);
            }
            else {
                this.cache[restaurant.key][dish.name].splice(this.cache[restaurant.key][dish.name].indexOf(user.email), 1);
            }
        }
    }

    private isCached(dish: Dish, restaurant: Restaurant): boolean {
        if (!this.cache[restaurant.key]) {
            return false;
        }
        if (!this.cache[restaurant.key][dish.name]) {
            return false;
        }
        if (!this.cache[restaurant.key][dish.name]) {
            return false;
        }

        return true;
    }

    private getCache(user: User, dish: Dish, restaurant: Restaurant): boolean {
        if (!this.isCached(dish, restaurant)) {
            return false;
        }

        return this.cache[restaurant.key][dish.name].includes(user.email);
    }

    public getLikes(dish: Dish, restaurant: Restaurant): number {
        if (!this.isCached(dish, restaurant)) {
            return 0;
        }

        return this.cache[restaurant.key][dish.name].length;
    }

    public like(user: User, dish: Dish, restaurant: Restaurant): Promise<boolean> {
        const query = this.afs.firestore.collection(`restaurants`).doc(restaurant.key);
        this.setCache(user, dish, restaurant, true);

        return new Promise<boolean>((success, reject) => {
            query.get().then((snapshot) => {
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

        return null;
    }

    public unlike(user: User, dish: Dish, restaurant: Restaurant): Promise<boolean> {
        const query = this.afs.firestore.collection(`restaurants`).doc(restaurant.key);
        this.setCache(user, dish, restaurant, false);

        return new Promise<boolean>((success, reject) => {
            query.get().then((snapshot) => {
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
            });
        });
    }

    public isLiked(user: User, dish: Dish, restaurant: Restaurant): boolean {
        if (!user || !dish) {
            return false;
        }

        return this.getCache(user, dish, restaurant);
    }

}
