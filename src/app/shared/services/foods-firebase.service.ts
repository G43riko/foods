import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {User} from "../interfaces/user.interface";
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

    public getZomatoFoods(ids: string[]): Observable<any> {
        const path = `menus/${this.getDate()}/dailyMenus`;
        const foodsRef: AngularFirestoreCollection<any> = this.afs.collection(path);

        return new Observable<any>((subject) => {
            foodsRef.get().subscribe((data) => {
                const result = {};
                data.forEach((doc) => {
                    result[doc.id] = doc.data();
                });

                // create array of requests to get missing menu;
                const missingIds = ids.filter((requiredId) => {
                    return !(requiredId in result);
                });

                // if no menu is missing
                if (missingIds.length === 0) {
                    console.log("ids1: ", ids);
                    subject.next(ids.map((id) => result[id]));

                    return;
                }

                // create array of requests
                const missingRequests = missingIds.map((requiredId) => {
                    return this.foodsRestService.getZomatoFood(requiredId).pipe(
                        switchMap((zomatoData) => {
                            return new Observable((subSubject) => {
                                this.afs
                                    .doc(path + "/" + requiredId)
                                    .set(zomatoData)
                                    .then(() => subSubject.next(zomatoData))
                                    .catch(() => subSubject.next(zomatoData));
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
                    console.log("ids2: ", ids);
                    subject.next(ids.map((id) => result[id]));
                }, subject.error);
            });
        });

        // return foodsRef.get().pipe(map((data) => {
        //     const result = {};
        //     data.forEach((doc) => {
        //         result[doc.id] = doc.data();
        //     });
        //
        //     const missingRequests = ids.filter((requiredId) => {
        //         return !(requiredId in result);
        //     }).map((requiredId) => {
        //         return this.foodsRestService.getZomatoFood(requiredId);
        //     });
        //
        //
        //     return result;
        // }));
    }

    public getZomatoFood(id: string): Observable<any> {
        if (!id) {
            throw new Error("id is: " + id);
        }

        const dailyMenuRef: AngularFirestoreDocument<User> = this.afs.doc(`menus/${this.getDate()}/dailyMenus/${id}`);

        return new Observable<any>((subject) => {
            const getAndStoreMenu = () => {
                this.foodsRestService.getZomatoFood(id).subscribe((newDailyMenu) => {
                    if (newDailyMenu) {
                        dailyMenuRef.set(newDailyMenu).then(() => {
                            subject.next(newDailyMenu);
                        }).catch(subject.error);
                    } else {
                        subject.error("Cannot get menus restaurant with zomatoId: " + id);
                    }
                }, subject.error);
            };

            dailyMenuRef.get().subscribe((dailyMenu) => {
                if (dailyMenu.exists) {
                    console.log("nextujeme: ", dailyMenu.data());
                    subject.next(dailyMenu.data());
                } else {
                    getAndStoreMenu();
                }
            }, () => getAndStoreMenu());
        });
    }
}
