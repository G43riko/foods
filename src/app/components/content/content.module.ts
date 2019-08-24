import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {FoodRowLikesComponent} from "./components/food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "./components/food-row-name/food-row-name.component";
import {FoodRowComponent} from "./components/food-row/food-row.component";
import {RestaurantFoodsComponent} from "./components/restaurant-foods/restaurant-foods.component";
import {RestaurantIframeComponent} from "./components/restaurant-iframe/restaurant-iframe.component";
import {RestaurantTitleComponent} from "./components/restaurant-title/restaurant-title.component";
import {ContentComponent} from "./content.component";
import {SafePipe} from "./pipes/safe.pipe";
import {SearchFoodPipe} from "./pipes/search-food.pipe";

@NgModule({
    declarations: [
        RestaurantFoodsComponent,
        ContentModule.rootComponent,
        FoodRowComponent,
        FoodRowLikesComponent,
        FoodRowNameComponent,
        RestaurantTitleComponent,
        SearchFoodPipe,
        SafePipe,
        RestaurantIframeComponent,
    ],
    imports: [
        TranslateModule,
        CommonModule,
    ],
    entryComponents: [
        ContentModule.rootComponent,
    ],
    exports: [
        ContentModule.rootComponent,
    ],
})
export class ContentModule {
    public static readonly rootComponent = ContentComponent;
}
