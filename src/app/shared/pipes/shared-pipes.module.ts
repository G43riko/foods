import {NgModule} from "@angular/core";
import {SafePipe} from "./safe.pipe";
import {SearchFoodPipe} from "./search-food.pipe";
import {SearchRestaurantPipe} from "./search-restaurant.pipe";

@NgModule({
    imports: [],
    declarations: [
        SearchFoodPipe,
        SafePipe,
        SearchRestaurantPipe,
    ],
    exports: [
        SearchFoodPipe,
        SafePipe,
        SearchRestaurantPipe,
    ],
})
export class SharedPipesModule {
}
