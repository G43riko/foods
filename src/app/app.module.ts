import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./components/app.component";
import {OptionsComponent} from "./components/options/options.component";
import {PageTopNavBarComponent} from "./components/page-top-nav-bar/page-top-nav-bar.component";
import {RestaurantFoodsComponent} from "./components/restaurant-foods/restaurant-foods.component";
import {RestaurantSelectorComponent} from "./components/restaurant-selector/restaurant-selector.component";
import {FirebaseModule} from "./shared/modules/firebase.module";
import {CoreModule} from "./shared/services/core.module";
import {SharedModule} from "./shared/shared.module";
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';

declare const window: any;

// const iframe = document.createElement("iframe");
// if (iframe) {
//     iframe.style.display = "none";
//     document.body.appendChild(iframe);
//     window.console = iframe.contentWindow.console;
// }
@NgModule({
    declarations: [
        AppComponent,
        RestaurantSelectorComponent,
        RestaurantFoodsComponent,
        PageTopNavBarComponent,
        OptionsComponent,
        ProfileMenuComponent,
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
