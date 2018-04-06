import {FoodsService} from "./foods.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {RestaurantSelectorComponent} from "./restaurant-selector/restaurant-selector.component";
import { SearchPipe } from './search.pipe';
import {StatsService} from "./stats.service";
declare const window;

const iframe = document.createElement("iframe");
iframe.style.display = "none";
document.body.appendChild(iframe);
console = iframe.contentWindow.console;
window.console = console;
@NgModule({
    declarations: [
        AppComponent,
        RestaurantSelectorComponent,
        SearchPipe
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
