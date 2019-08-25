import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RestaurantListRoutesModule} from "./restaurant-list-routes.module";
import {RestaurantListRowComponent} from "./restaurant-list-row/restaurant-list-row.component";
import {RestaurantListComponent} from "./restaurant-list.component";

@NgModule({
    declarations: [RestaurantListComponent, RestaurantListRowComponent],
    imports: [
        CommonModule,
        RestaurantListRoutesModule,
    ],
})
export class RestaurantListModule {
}
