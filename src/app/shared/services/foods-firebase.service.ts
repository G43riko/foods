import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {User} from "../interfaces/user.interface";
import {Restaurant} from "../models/restaurant.model";
import {FoodsRestService} from "./foods.rest.service";

@Injectable({
    providedIn: "root",
})
export class FoodsFirebaseService {

    public constructor(private readonly afs: AngularFirestore,
                       private readonly foodsRestService: FoodsRestService) {
    }

    private getDate(): string {
        return new Date().toISOString().substring(0, 10);
    }

    public hasMenu(restaurant: Restaurant): Observable<boolean> {
        const dailyMenuRef: AngularFirestoreDocument<User> = this.afs.doc(`menus/${this.getDate()}/dailyMenus/${restaurant.id}`);

        return dailyMenuRef.get().pipe(map((data) => {
            const realData = data.data();

            return realData && Array.isArray(realData.daily_menus) && realData.daily_menus.length > 0;
        }));
    }

    public getZomatoFoods(ids: string[]): Observable<any> {
        const path = `menus/${this.getDate()}/dailyMenus`;
        const foodsRef: AngularFirestoreCollection<any> = this.afs.collection(path);

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
                const missingIds = ids.filter((requiredId) => {
                    return !(requiredId in result);
                });

                // if no menu is missing
                if (missingIds.length === 0) {
                    subject.next(ids.map((id) => result[id]));
                    subject.complete();

                    return;
                }

                // create array of requests
                const missingRequests = missingIds.map((requiredId) => {
                    return this.foodsRestService.getZomatoFood(requiredId).pipe(
                        switchMap((zomatoData) => {
                            return new Observable((subSubject) => {
                                const finishUpdatingFirebase = () => {
                                    subSubject.next(zomatoData);
                                    subSubject.complete();
                                };
                                this.afs
                                    .doc(path + "/" + requiredId)
                                    .set(zomatoData)
                                    .then(finishUpdatingFirebase)
                                    .catch(finishUpdatingFirebase);
                            });
                        }),
                        catchError(() => of(null)),
                    );
                });

                // wait for all requests
                forkJoin(missingRequests).subscribe((gatherMenus) => {
                    gatherMenus.forEach((menu, index) => {
                        result[missingIds[index]] = menu;
                    });
                    subject.next(ids.map((id) => result[id]));
                    subject.complete();
                }, subject.error);
            });
        });
    }

    public getZomatoFood(id: string): Observable<any> {
        const dailyMenuRef: AngularFirestoreDocument<User> = this.afs.doc(`menus/${this.getDate()}/dailyMenus/${id}`);

        return new Observable<any>((subject) => {
            const getAndStoreMenu = () => {
                this.foodsRestService.getZomatoFood(id).subscribe((newDailyMenu) => {
                    if (newDailyMenu) {
                        dailyMenuRef.set(newDailyMenu).then(() => {
                            subject.next(newDailyMenu);
                            subject.complete();
                        }).catch(subject.error);
                    } else {
                        subject.error("Cannot get menus restaurant with zomatoId: " + id);
                    }
                }, subject.error);
            };

            dailyMenuRef.get().subscribe((dailyMenu) => {
                const data = dailyMenu.data();
                if (Array.isArray(data.daily_menus) && data.daily_menus.length > 0) {
                    subject.next(data);
                    subject.complete();
                } else {
                    getAndStoreMenu();
                }
            }, () => getAndStoreMenu());
        });
    }
}
