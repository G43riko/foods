import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {firestore} from "firebase";
import {of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {User} from "../interfaces/user.interface";
import {Colors} from "../models/colors.enum";
import {AuthService} from "./auth.service";

export interface AppConfiguration {
    selectedColor?: Colors;
    inverted: boolean;
    allowIFrames: boolean;
    showDistance: boolean;
    showPrice: boolean;
    showWeight: boolean;
}

@Injectable()
export class AppService {
    private configuration = AppService.getDefaultConfiguration();

    private ref: AngularFirestoreDocument<User>;

    public constructor(private readonly afs: AngularFirestore,
                       private readonly authService: AuthService) {
        authService.user$.pipe(
            switchMap((user) => {
                if (user) {
                    this.ref = this.afs.doc<User>(`users/${user.uid}`);

                    return this.ref.get();
                }

                return of(undefined);
            }),
        ).subscribe((user: firestore.DocumentSnapshot | undefined) => {
            if (user) {
                const userData = user.data();
                if (userData.config) {
                    this.configuration = userData.config;

                    return;
                }
            }
            this.configuration = AppService.getDefaultConfiguration();

        });
    }

    private static getDefaultConfiguration(): AppConfiguration {
        return {
            inverted: false,
            allowIFrames: true,
            showDistance: true,
            showPrice: true,
            showWeight: true,
        };
    }

    public setConfig<T extends keyof AppConfiguration>(key: T, value: AppConfiguration[T]): void {
        this.configuration[key] = value;
        (this.ref as any).update({
            config: {
                ...this.configuration,
                [key]: value,
            },
        });
    }

    public getConfig<T extends keyof AppConfiguration>(key: T): AppConfiguration[T] {
        return this.configuration[key];
    }

    public set inverted(value: boolean) {
        this.setConfig("inverted", value);
    }

    public get inverted(): boolean {
        return this.getConfig("inverted");
    }

    public set allowIFrames(value: boolean) {
        this.setConfig("allowIFrames", value);
    }

    public get allowIFrames(): boolean {
        return this.getConfig("allowIFrames");
    }

    public set showDistance(value: boolean) {
        this.setConfig("showDistance", value);
    }

    public get showDistance(): boolean {
        return this.getConfig("showDistance");
    }

    public set showPrice(value: boolean) {
        this.setConfig("showPrice", value);
    }

    public get showPrice(): boolean {
        return this.configuration.showPrice;
    }

    public set showWeight(value: boolean) {
        this.setConfig("showWeight", value);
    }

    public get showWeight(): boolean {
        return this.configuration.showWeight;
    }

    public reset(): void {
        throw new Error("Configuration reset is not implemented");
    }
}
