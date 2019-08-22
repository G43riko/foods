import {LayoutModule} from "@angular/cdk/layout";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {ServiceWorkerModule} from "@angular/service-worker";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {environment} from "../environments/environment";
import {AppComponent} from "./app.component";
import {ContentModule} from "./components/content/content.module";
import {OptionsModule} from "./components/options/options.module";
import {PreferenceModule} from "./components/preference/preference.module";
import {RestaurantSelectorModule} from "./components/restaurant-selector/restaurant-selector.module";
import {ProfileMenuComponent} from "./layout/profile-menu/profile-menu.component";
import {TopMenuComponent} from "./layout/top-menu/top-menu.component";
import {FirebaseModule} from "./shared/modules/firebase.module";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        AppComponent,
        ProfileMenuComponent,
        TopMenuComponent,
    ],
    imports: [
        // MY MODULES
        RestaurantSelectorModule,
        ContentModule,
        OptionsModule,
        PreferenceModule,

        // CDK
        LayoutModule,

        FirebaseModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        ServiceWorkerModule.register("ngsw-worker.js", {enabled: environment.production}),
    ],
    providers: [
        // fakeBackendProvider,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
