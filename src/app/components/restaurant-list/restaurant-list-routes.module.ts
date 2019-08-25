import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RestaurantListComponent} from "./restaurant-list.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: RestaurantListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RestaurantListRoutesModule {
}
