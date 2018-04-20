import {FoodsService} from "./services/foods.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {AppComponent} from "./components/app.component";
import {FormsModule} from "@angular/forms";
import {RestaurantSelectorComponent} from "./components/restaurant-selector/restaurant-selector.component";
import {SearchPipe} from "./pipes/search.pipe";
import {StatsService} from "./services/stats.service";
import {RestaurantFoodsComponent} from "./components/restaurant-foods/restaurant-foods.component";
import {PageNavBarComponent} from "./components/page-nav-bar/page-nav-bar.component";

declare const window: any;

const iframe = document.createElement("iframe");
if (iframe) {
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    window.console = iframe.contentWindow.console;
}

@NgModule({
    declarations: [
        AppComponent,
        RestaurantSelectorComponent,
        SearchPipe,
        RestaurantFoodsComponent,
        PageNavBarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        FoodsService,
        StatsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }
}
