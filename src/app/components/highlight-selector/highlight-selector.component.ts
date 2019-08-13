import {Component, OnInit} from "@angular/core";
import {FoodData} from "../../../data/foodData";
import {Food} from "../../shared/models/food.model";
import {AnalyticsService} from "../../shared/services/analytics.service";
import {AppService} from "../../shared/services/app.service";

@Component({
    selector: "app-highlight-selector",
    templateUrl: "./highlight-selector.component.html",
    styleUrls: ["./highlight-selector.component.css"],
})
export class HighlightSelectorComponent implements OnInit {
    public highlightTypes: Food[] = FoodData;
    public searchKey: string;
    public highlight: Food = this.highlightTypes[0];

    public constructor(public readonly appService: AppService,
                       private readonly analyticsService: AnalyticsService) {
    }

    public select(key: string): void {
        this.analyticsService.highlight(key);
    }

    public ngOnInit(): void {
    }

}
