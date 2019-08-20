import {Injectable} from "@angular/core";
import {AngularFirestoreDocument} from "@angular/fire/firestore";
import {TranslateService} from "@ngx-translate/core";
import {firestore} from "firebase";
import {BehaviorSubject, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {User} from "../interfaces/user.interface";
import {Colors} from "../models/colors.enum";
import {AuthService} from "./auth.service";
import {FirebaseService} from "./firebase.service";

export interface AppConfiguration {
    selectedColor?: Colors;
    inverted: boolean;
    allowIFrames: boolean;
    showDistance: boolean;
    showPrice: boolean;
    showWeight: boolean;
    language?: string;
    selectedRestaurants?: string[];
}

@Injectable({
    providedIn: "root",
})
export class AppService {
    public readonly configuration: BehaviorSubject<AppConfiguration> = new BehaviorSubject<AppConfiguration>(this.getDefaultConfiguration());
    private isLoggedIn = false;
    private ref: AngularFirestoreDocument<User>;

    public constructor(private readonly translateService: TranslateService,
                       private readonly firebaseService: FirebaseService,
                       private readonly authService: AuthService) {
        translateService.setDefaultLang("en");
        translateService.use(translateService.getBrowserLang());

        authService.user$.pipe(
            switchMap((user) => {
                this.isLoggedIn = Boolean(user);
                if (user) {
                    this.ref = this.firebaseService.getUser(user.uid);

                    return this.ref.get();
                }

                return of(undefined);
            }),
        ).subscribe((user: firestore.DocumentSnapshot | undefined) => {
            if (user) {
                const userData = user.data();
                if (userData.config) {
                    userData.config.language = userData.config.language || "sk";
                    userData.config.selectedRestaurants = userData.config.selectedRestaurants || [];
                    this.translateService.use(userData.config.language);
                    this.configuration.next(userData.config);

                    return;
                }
            }
            this.translateService.use("sk");
            this.configuration.next(this.getDefaultConfiguration());

        });
    }

    public get inverted(): boolean {
        return this.getConfig("inverted");
    }

    public set inverted(value: boolean) {
        this.setConfig("inverted", value);
    }

    public get allowIFrames(): boolean {
        return this.getConfig("allowIFrames");
    }

    public set allowIFrames(value: boolean) {
        this.setConfig("allowIFrames", value);
    }

    public get showDistance(): boolean {
        return this.getConfig("showDistance");
    }

    public set showDistance(value: boolean) {
        this.setConfig("showDistance", value);
    }

    public get showPrice(): boolean {
        return this.getConfig("showPrice");
    }

    public set showPrice(value: boolean) {
        this.setConfig("showPrice", value);
    }

    public get showWeight(): boolean {
        return this.getConfig("showWeight");
    }

    public set showWeight(value: boolean) {
        this.setConfig("showWeight", value);
    }

    public setConfig<T extends keyof AppConfiguration>(key: T, value: AppConfiguration[T]): void {
        if (!this.isLoggedIn) {
            return;
        }
        (this.ref as any).update({
            config: {
                ...this.configuration.value,
                [key]: value,
            },
        });
    }

    public getConfig<T extends keyof AppConfiguration>(key: T): AppConfiguration[T] {
        return this.configuration.value[key];
    }

    public reset(): void {
        throw new Error("Configuration reset is not implemented");
    }

    private getDefaultConfiguration(selectedRestaurants?: string[]): AppConfiguration {
        return {
            inverted: false,
            allowIFrames: true,
            showDistance: true,
            showPrice: true,
            showWeight: true,
            language: "en",
            selectedRestaurants: selectedRestaurants || [],
        };
    }
}
