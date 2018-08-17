import {FoodsRestService} from "./shared/services/foods.rest.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {AppComponent} from "./components/app.component";
import {FormsModule} from "@angular/forms";
import {RestaurantSelectorComponent} from "./components/restaurant-selector/restaurant-selector.component";
import {StatsService} from "./shared/services/stats.service";
import {RestaurantFoodsComponent} from "./components/restaurant-foods/restaurant-foods.component";
import {PageNavBarComponent} from "./components/page-nav-bar/page-nav-bar.component";
import {ParserService} from "./shared/services/parser.service";
import {FoodsService} from "./shared/services/foods.service";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./shared/services/core.module";

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
        RestaurantFoodsComponent,
        PageNavBarComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,

        SharedModule,
        CoreModule,
    ],
    providers: [
        FoodsRestService,
        FoodsService,
        StatsService,
        ParserService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
