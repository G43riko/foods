import {DragDropModule} from "@angular/cdk/drag-drop";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {RatingService} from "../../shared/services/rating.service";
import {RestaurantService} from "../../shared/services/restaurant.service";
import {RestaurantSelectorRowComponent} from "./restaurant-selector-row/restaurant-selector-row.component";
import {RestaurantSelectorComponent} from "./restaurant-selector.component";
import {SearchRestaurantPipe} from "./search-restaurant.pipe";

@NgModule({
    declarations: [
        RestaurantSelectorRowComponent,
        RestaurantSelectorComponent,
        SearchRestaurantPipe,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        DragDropModule,
        FormsModule,
    ],
    providers: [
        RatingService,
        RestaurantService,
    ],
    exports: [
        RestaurantSelectorComponent,
    ],
})
export class RestaurantSelectorModule {
}
