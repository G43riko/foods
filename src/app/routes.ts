import {Routes} from "@angular/router";
import {FoodsComponent} from "./components/foods.component";
import {MainComponent} from "./components/main/main.component";

export const fdsRoutes: Routes = [
    {
        path: "",
        redirectTo: "/foods",
        pathMatch: "full",
    },
    {
        path: "foods",
        component: FoodsComponent,
    },
    {
        path: "restaurants",
        loadChildren: () => import("./components/restaurant-list/restaurant-list.module").then((mod) => mod.RestaurantListModule),
    },
    {
        path: "new",
        component: MainComponent,
    },
    {
        path: "**",
        redirectTo: "/foods",
    },
];
