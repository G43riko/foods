import {LayoutModule} from "@angular/cdk/layout";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {ServiceWorkerModule} from "@angular/service-worker";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {environment} from "../environments/environment";
import {AppComponent} from "./app.component";
import {ContentModule} from "./components/content/content.module";
import {FoodsComponent} from "./components/foods.component";
import {OptionsModule} from "./components/options/options.module";
import {PreferenceModule} from "./components/preference/preference.module";
import {RestaurantSelectorModule} from "./components/restaurant-selector/restaurant-selector.module";
import {ProfileMenuComponent} from "./layout/profile-menu/profile-menu.component";
import {TopMenuComponent} from "./layout/top-menu/top-menu.component";
import {LoadModuleDirective} from "./load-module.directive";
import {fdsRoutes} from "./routes";
import {FirebaseModule} from "./shared/modules/firebase.module";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        AppComponent,
        ProfileMenuComponent,
        TopMenuComponent,
        LoadModuleDirective,
        FoodsComponent,
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
        RouterModule.forRoot(
            fdsRoutes,
            {
                enableTracing: false,
                useHash: true,
            },
        ),
        ServiceWorkerModule.register("ngsw-worker.js", {enabled: environment.production}),
    ],
    providers: [
        // fakeBackendProvider,
        {provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
