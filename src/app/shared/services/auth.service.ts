import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";
import {auth} from "firebase/app";
import {Observable, of} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {User} from "../interfaces/user.interface";
import {AnalyticsService} from "./analytics.service";
import {FirebaseService} from "./firebase.service";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    public readonly user$: Observable<User | undefined>;
    public isLoading = true;

    public constructor(public readonly afAuth: AngularFireAuth,
                       private readonly analyticsService: AnalyticsService,
                       private readonly firebaseService: FirebaseService) {
        this.user$ = this.afAuth.authState.pipe(
            tap(() => this.isLoading = true),
            switchMap((user) => {
                if (user) {
                    return firebaseService.getUser(user.uid).valueChanges();
                }

                return of(undefined);
            }),
            tap(() => this.isLoading = false),
        );

    }

    public async googleSigning(): Promise<void> {
        const provider = new auth.GoogleAuthProvider();
        const credentials = await this.afAuth.auth.signInWithPopup(provider);
        this.analyticsService.login("google");

        return this.updateUserData(credentials.user);
    }

    public async facebookSigning(): Promise<void> {
        const provider = new auth.FacebookAuthProvider();
        const credentials = await this.afAuth.auth.signInWithPopup(provider);
        this.analyticsService.login("facebook");

        return this.updateUserData(credentials.user);
    }

    public async githubSigning(): Promise<void> {
        const provider = new auth.GithubAuthProvider();
        const credentials = await this.afAuth.auth.signInWithPopup(provider);
        this.analyticsService.login("github");

        return this.updateUserData(credentials.user);
    }

    public async signOut(): Promise<boolean> {
        await this.afAuth.auth.signOut();
        this.analyticsService.logout();

        return null;
    }

    private updateUserData(user: any): Promise<void> {
        const providerData = user.providerData && user.providerData[0] || {};

        const createdUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || providerData.displayName || null,
            photoURL: user.photoURL || providerData.photoURL || null,
        };

        return this.firebaseService.getUser(user.uid).set(createdUser, {merge: true});
    }
}
