import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import { auth } from "firebase/app";
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {User} from "../interfaces/user.interface";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    public readonly user$: Observable<User | undefined>;

    public constructor(public readonly afAuth: AngularFireAuth,
                       private readonly afs: AngularFirestore) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap((user) => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                }

                return of(undefined);
            }),
        );
    }

    public async googleSigning(): Promise<void> {
        const provider = new auth.GoogleAuthProvider();
        const credentials = await this.afAuth.auth.signInWithPopup(provider);

        return this.updateUserData(credentials.user);
    }
    public async facebookSigning(): Promise<void> {
        const provider = new auth.FacebookAuthProvider();
        const credentials = await this.afAuth.auth.signInWithPopup(provider);

        return this.updateUserData(credentials.user);
    }
    public async githubSigning(): Promise<void> {
        const provider = new auth.GithubAuthProvider();
        const credentials = await this.afAuth.auth.signInWithPopup(provider);

        return this.updateUserData(credentials.user);
    }

    public async signOut(): Promise<boolean> {
        await this.afAuth.auth.signOut();

        return null;
    }

    private updateUserData(user: any): Promise<void> {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
        const providerData = user.providerData && user.providerData[0] || {};
        const createdUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || providerData.displayName || null,
            photoURL: user.photoURL || providerData.photoURL || null,
        };

        return userRef.set(createdUser, {merge: true});
    }
}
