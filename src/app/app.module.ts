import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./components/app.component";
import {FoodRowLikesComponent} from "./components/food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "./components/food-row-name/food-row-name.component";
import {FoodRowComponent} from "./components/food-row/food-row.component";
import { MenuContainerComponent } from "./components/menu-containter/menu-container.component";
import { MenuContentComponent } from "./components/menu-content/menu-content.component";
import { MenuDrawerComponent } from "./components/menu-drawer/menu-drawer.component";
import { MenuTesterComponent } from "./components/menu-tester/menu-tester.component";
import {OptionsComponent} from "./components/options/options.component";
import {PageTopNavBarComponent} from "./components/page-top-nav-bar/page-top-nav-bar.component";
import {ProfileMenuComponent} from "./components/profile-menu/profile-menu.component";
import {RestaurantFoodsComponent} from "./components/restaurant-foods/restaurant-foods.component";
import {RestaurantSelectorComponent} from "./components/restaurant-selector/restaurant-selector.component";
import {FirebaseModule} from "./shared/modules/firebase.module";
import {CoreModule} from "./shared/services/core.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
    declarations: [
        AppComponent,
        RestaurantSelectorComponent,
        RestaurantFoodsComponent,
        PageTopNavBarComponent,
        OptionsComponent,
        ProfileMenuComponent,
        FoodRowComponent,
        FoodRowLikesComponent,
        FoodRowNameComponent,
        MenuTesterComponent,
        MenuDrawerComponent,
        MenuContainerComponent,
        MenuContentComponent,
    ],
    imports: [
        FirebaseModule,
        BrowserModule,
        FormsModule,
        SharedModule,
        CoreModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
