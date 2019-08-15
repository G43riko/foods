import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {Config} from "../../appConfig";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AngularFireModule.initializeApp(Config.FIREBASE_AUTH),
    ],
    exports: [
        AngularFireModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
    ],
})
export class FirebaseModule {
}
