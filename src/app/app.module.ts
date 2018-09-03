import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./components/app.component";
import {OptionsComponent} from "./components/options/options.component";
import {PageTopNavBarComponent} from "./components/page-top-nav-bar/page-top-nav-bar.component";
import {RestaurantFoodsComponent} from "./components/restaurant-foods/restaurant-foods.component";
import {RestaurantSelectorComponent} from "./components/restaurant-selector/restaurant-selector.component";
import {CoreModule} from "./shared/services/core.module";
import {FoodsRestService} from "./shared/services/foods.rest.service";
import {FoodsService} from "./shared/services/foods.service";
import {ParserService} from "./shared/services/parser.service";
import {StatsService} from "./shared/services/stats.service";
import {SharedModule} from "./shared/shared.module";

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
        PageTopNavBarComponent,
        OptionsComponent,
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
