import {Component, OnInit} from "@angular/core";
import {FoodData} from "../../../data/foodData";
import {Food} from "../../models/food.model";

@Component({
    selector: "app-page-nav-bar",
    templateUrl: "./page-nav-bar.component.html",
    styleUrls: ["./page-nav-bar.component.scss"]
})
export class PageNavBarComponent implements OnInit {
    public highlightTypes: Food[] = FoodData;
    public searchKey: string;
    public highlight: Food = this.highlightTypes[0];

    public constructor() {
    }

    public ngOnInit() {
    }

}
