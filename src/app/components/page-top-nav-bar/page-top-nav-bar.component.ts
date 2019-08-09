import {Component} from "@angular/core";
import {FoodData} from "../../../data/foodData";
import {Food} from "../../shared/models/food.model";
import {AppService} from "../../shared/services/app.service";

@Component({
    selector: "app-page-nav-bar",
    templateUrl: "./page-top-nav-bar.component.html",
    styleUrls: ["./page-top-nav-bar.component.scss"],
})
export class PageTopNavBarComponent {
    public highlightTypes: Food[] = FoodData;
    public searchKey: string;
    public highlight: Food = this.highlightTypes[0];

    public constructor(public readonly appService: AppService) {

    }
}
