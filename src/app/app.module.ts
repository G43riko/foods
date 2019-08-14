import {DragDropModule} from "@angular/cdk/drag-drop";
import {LayoutModule} from "@angular/cdk/layout";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./components/app.component";
import { ContentComponent } from "./components/content/content.component";
import {FoodRowLikesComponent} from "./components/food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "./components/food-row-name/food-row-name.component";
import {FoodRowComponent} from "./components/food-row/food-row.component";
import { HighlightSelectorComponent } from "./components/highlight-selector/highlight-selector.component";
import { MenuContainerComponent } from "./components/menu-containter/menu-container.component";
import { MenuContentComponent } from "./components/menu-content/menu-content.component";
import { MenuDrawerComponent } from "./components/menu-drawer/menu-drawer.component";
import { MenuTesterComponent } from "./components/menu-tester/menu-tester.component";
import {OptionsComponent} from "./components/options/options.component";
import {PageTopNavBarComponent} from "./components/page-top-nav-bar/page-top-nav-bar.component";
import {ProfileMenuComponent} from "./components/profile-menu/profile-menu.component";
import {RestaurantFoodsComponent} from "./components/restaurant-foods/restaurant-foods.component";
import {RestaurantSelectorComponent} from "./components/restaurant-selector/restaurant-selector.component";
import { TopMenuComponent } from "./components/top-menu/top-menu.component";
import {FirebaseModule} from "./shared/modules/firebase.module";
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
        HighlightSelectorComponent,
        TopMenuComponent,
        ContentComponent,
    ],
    imports: [
        DragDropModule,
        LayoutModule,
        FirebaseModule,
        BrowserModule,
        FormsModule,
        SharedModule,
        HttpClientModule,
    ],
    providers: [
        // fakeBackendProvider,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
