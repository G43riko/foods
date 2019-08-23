import {Injectable} from "@angular/core";
import {AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {forkJoin, Observable, of, Subscriber} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {Restaurant} from "../models/restaurant.model";
import {FirebaseDailyMenuData, FirebaseService} from "./firebase.service";
import {FoodsExternalService} from "./foods-external.service";

@Injectable({
    providedIn: "root",
})
export class FoodsFirebaseService {
    public constructor(private readonly firebaseService: FirebaseService,
                       private readonly foodsExternalService: FoodsExternalService) {
    }

    public hasZomatoMenu(restaurant: Restaurant): Observable<boolean> {
        const dailyMenuRef: AngularFirestoreDocument<FirebaseDailyMenuData> = this.firebaseService.getZomatoMenu(restaurant);

        return dailyMenuRef.get().pipe(map((data) => {
            const realData = data.data();

            return realData && Array.isArray(realData.daily_menus) && realData.daily_menus.length > 0;
        }));
    }

    public getZomatoFoods(restaurants: Restaurant[]): Observable<any> {
        const foodsRef: AngularFirestoreCollection<any> = this.firebaseService.getZomatoMenus();

        return new Observable<any>((subject) => {
            foodsRef.get().subscribe((data) => {
                const result = {};
                data.forEach((doc) => {
                    const menuData = doc.data();
                    if (Array.isArray(menuData.daily_menus) && menuData.daily_menus.length > 0) {
                        result[doc.id] = menuData;
                    }
                });

                // create array of requests to get missing menu;
                const missingRestaurants = restaurants.filter((restaurant) => {
                    return !(restaurant.key in result);
                });

                // if no menu is missing
                if (missingRestaurants.length === 0) {
                    subject.next(restaurants.map((restaurant) => result[restaurant.key]));
                    subject.complete();

                    return;
                }

                // create array of requests
                const missingRequests = missingRestaurants.map((restaurant) => {
                    return this.foodsExternalService.getZomatoFoodRaw(restaurant.zomatoName).pipe(
                        switchMap((newDailyMenu) => {
                            return new Observable((subSubject) => this.processNewZomatoMenu(
                                newDailyMenu,
                                this.firebaseService.getZomatoMenu(restaurant),
                                subSubject,
                                restaurant,
                            ));
                        }),
                        catchError(() => of(null)),
                    );
                });

                // wait for all requests
                forkJoin(missingRequests).subscribe((gatherMenus) => {
                    gatherMenus.forEach((menu, index) => {
                        result[missingRestaurants[index].key] = menu;
                    });
                    subject.next(restaurants.map((restaurant) => result[restaurant.key]));
                    subject.complete();
                }, subject.error);
            });
        });
    }

    public getZomatoFood(restaurant: Restaurant): Observable<any> {
        const dailyMenuRef: AngularFirestoreDocument<any> = this.firebaseService.getZomatoMenu(restaurant);

        return new Observable<any>((subject) => {
            const getAndStoreMenu = () => {
                this.foodsExternalService.getZomatoFoodRaw(restaurant.zomatoName).subscribe((newDailyMenu) => {
                    if (typeof newDailyMenu === "number") {
                        subject.next(newDailyMenu);
                        subject.complete();

                        return;
                    }
                    this.processNewZomatoMenu(newDailyMenu, dailyMenuRef, subject, restaurant);
                }, subject.error);
            };

            dailyMenuRef.get().subscribe((dailyMenu) => {
                const data = dailyMenu.data();
                if (data && Array.isArray(data.daily_menus) && data.daily_menus.length > 0) {
                    subject.next(data);
                    subject.complete();
                } else {
                    getAndStoreMenu();
                }
            }, () => getAndStoreMenu());
        }).pipe(catchError((error) => {
            console.log("error: ", error);
            return of(error);
        }));
    }

    private processNewZomatoMenu(newDailyMenu: any, dailyMenuRef: AngularFirestoreDocument<any>, subject: Subscriber<any>, restaurant: Restaurant): void {
        if (newDailyMenu) {
            const finishUpdatingFirebase = () => {
                subject.next(newDailyMenu);
                subject.complete();
            };
            dailyMenuRef.set(newDailyMenu, {merge: true})
                .then(finishUpdatingFirebase)
                .catch(finishUpdatingFirebase);
        } else {
            subject.error("Cannot get zomato menu for restaurant " + restaurant.name);
        }
    }
}
