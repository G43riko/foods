import {BreakpointObserver} from "@angular/cdk/layout";
import {Component, Input, OnInit} from "@angular/core";
import {FoodData} from "../../../../../data/foodData";
import {Food} from "../../../../shared/models/food.model";
import {AnalyticsService} from "../../../../shared/services/analytics.service";
import {AppService} from "../../../../shared/services/app.service";

@Component({
    selector: "app-highlight-selector",
    templateUrl: "./highlight-selector.component.html",
    styleUrls: ["./highlight-selector.component.css"],
})
export class HighlightSelectorComponent implements OnInit {
    @Input() public openHighlighter: boolean;
    public highlightTypes: Food[] = FoodData;
    public highlight: Food = this.highlightTypes[0];
    public deviceIsTabled: boolean;

    public constructor(public readonly appService: AppService,
                       private readonly breakpointObserver: BreakpointObserver,
                       private readonly analyticsService: AnalyticsService) {
        breakpointObserver.observe("(min-width: 599px)").subscribe((result) => {
            this.deviceIsTabled = result.matches;
        });
    }

    public select(key: string): void {
        this.analyticsService.highlight(key);
    }

    public ngOnInit(): void {
    }

}
