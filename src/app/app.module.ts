import {DragDropModule} from "@angular/cdk/drag-drop";
import {LayoutModule} from "@angular/cdk/layout";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AppComponent} from "./components/app.component";
import {ContentComponent} from "./components/content/content.component";
import {FoodRowLikesComponent} from "./components/content/food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "./components/content/food-row-name/food-row-name.component";
import {FoodRowComponent} from "./components/content/food-row/food-row.component";
import {RestaurantFoodsComponent} from "./components/content/restaurant-foods/restaurant-foods.component";
import {RestaurantTitleComponent} from "./components/content/restaurant-title/restaurant-title.component";
import {ProfileMenuComponent} from "./components/layout/profile-menu/profile-menu.component";
import {HighlightSelectorComponent} from "./components/layout/sidebars/highlight-selector/highlight-selector.component";
import {OptionsComponent} from "./components/layout/sidebars/options/options.component";
import {RestaurantSelectorComponent} from "./components/layout/sidebars/restaurant-selector/restaurant-selector.component";
import {TopMenuComponent} from "./components/layout/top-menu/top-menu.component";
import {FirebaseModule} from "./shared/modules/firebase.module";
import {SharedModule} from "./shared/shared.module";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        AppComponent,
        RestaurantSelectorComponent,
        RestaurantFoodsComponent,
        OptionsComponent,
        ProfileMenuComponent,
        FoodRowComponent,
        FoodRowLikesComponent,
        FoodRowNameComponent,
        HighlightSelectorComponent,
        TopMenuComponent,
        ContentComponent,
        RestaurantTitleComponent,
    ],
    imports: [
        DragDropModule,
        LayoutModule,
        FirebaseModule,
        BrowserModule,
        FormsModule,
        SharedModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        // fakeBackendProvider,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
