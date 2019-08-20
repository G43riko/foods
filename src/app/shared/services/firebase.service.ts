import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {User} from "../interfaces/user.interface";
import {Restaurant} from "../models/restaurant.model";
import {CoreService} from "./core.service";

export interface FirebaseRestaurantDishesData {
    [dishName: string]: string[];
}

export interface FirebaseRestaurantsData {
    [restaurantKey: string]: FirebaseRestaurantDishesData;
}

export interface FirebaseDailyMenuData {
    daily_menus: any[];
}

export interface FirebaseDailyMenusData {
    [restaurantKey: string]: FirebaseDailyMenuData;
}

@Injectable({
    providedIn: "root",
})
export class FirebaseService {

    public constructor(private readonly coreService: CoreService,
                       private readonly afs: AngularFirestore) {
    }

    public getRestaurants(): AngularFirestoreCollection<Restaurant> {
        return this.afs.collection(`restaurants`);
    }

    public getUsers(): AngularFirestoreCollection<User> {
        return this.afs.collection("users");
    }

    public getRestaurant(restaurant: Restaurant): AngularFirestoreDocument<FirebaseRestaurantDishesData> {
        return this.afs.doc(`restaurants/${restaurant.key}`);
    }

    public getUser(userId: string | number): AngularFirestoreDocument<User> {
        return this.afs.doc(`users/${userId}`);
    }

    public getZomatoMenus(): AngularFirestoreCollection<FirebaseDailyMenusData> {
        return this.afs.collection(`menus/${this.coreService.getDate()}/zomatoMenus`);
    }

    public getZomatoMenu(restaurant: Restaurant): AngularFirestoreDocument<FirebaseDailyMenuData> {
        return this.afs.doc(`menus/${this.coreService.getDate()}/zomatoMenus/${restaurant.key}`);
    }
}
