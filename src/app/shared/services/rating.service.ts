import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../interfaces/user.interface";
import {Dish} from "../models/dish.model";
import {Restaurant} from "../models/restaurant.model";

@Injectable({
    providedIn: "root",
})
export class RatingService {

    public constructor(private readonly afs: AngularFirestore) {
    }

    private getDate(): string {
        return new Date().toISOString().substring(0, 10);
    }

    public like(user: User, dish: Dish, restaurant: Restaurant): Promise<void> {
        const col = this.afs.firestore.collection(`restaurants`);
        const query = col.doc(restaurant.key).collection("foods").doc(dish.name);
        // const doc = this.afs.firestore.doc(`restaurants/${restaurant.key}/foods/${dish.name}}`);

        return new Promise<void>((success, reject) => {
            query.get().then((snapshot) => {
                // const date = this.getDate();
                const date = "2019-08-07";
                if (snapshot.exists) {
                    const data = snapshot.data();
                    if (Array.isArray(data[date])) {
                        if (data[date].includes(user.email)) {
                            success();

                            return;
                        }
                        data[date].push(user.email);

                        query.set(data, {merge: true}).then(success).catch(reject);
                    }
                    else {
                        query.set({
                            [date]: [user.email],
                        }, {merge: true}).then(success).catch(reject);
                    }
                }
                else {
                    query.set({
                        [date]: [user.email],
                    }).then(success).catch(reject);
                }
            });
        });

        return null;
        // const collection = firestore.collection(`ratings/${restaurant.key}/${dish.name}/`);
        // collection.get().then((snapshot) => {
        //     snapshot.docs.forEach((doc) => {
        //         doc.data().
        //     })
        // })
        // return doc.update([user.email]);
    }
    public unlike(user: User, dish: Dish, restaurant: Restaurant): Promise<void> {
        const doc = this.afs.doc(`ratings/${restaurant.key}/${dish.name}/`);

        return doc.update([user.email]);
    }

    // RESTAURANT_KEY / FOODS / DISH_NAME / DATE / [EMAIL]
    public isLiked(user: User, dish: Dish, restaurant: Restaurant): Promise<boolean> {
        // const firestore = firebase.firestore();
        const col = this.afs.firestore.collection(`restaurants`);
        const query = col.doc(restaurant.key).collection("foods").doc(dish.name); // .where(`${dish.name}.${this.getDate()}`, "array-contains", user.email);

        return new Promise<boolean>((success, reject) => {
            query.get().then((snapshot) => {
                const listOfLikes = Object.values(snapshot.data());
                success(listOfLikes.some((list: string[]) => list.includes(user.email)));
            }).catch(reject);
        });
    }

    private getNameFor(dish: Dish, restaurant: Restaurant): string {
        return restaurant.key + "_" + dish.name;
    }
}
