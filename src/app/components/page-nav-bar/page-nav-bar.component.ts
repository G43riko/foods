import {Component} from "@angular/core";
import {FoodData} from "../../../data/foodData";
import {Food} from "../../shared/models/food.model";

@Component({
    selector: "app-page-nav-bar",
    templateUrl: "./page-nav-bar.component.html",
    styleUrls: ["./page-nav-bar.component.scss"],
})
export class PageNavBarComponent {
    public highlightTypes: Food[] = FoodData;
    public searchKey: string;
    public highlight: Food = this.highlightTypes[0];

}
