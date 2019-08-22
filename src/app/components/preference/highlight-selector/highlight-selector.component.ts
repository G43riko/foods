import {BreakpointObserver} from "@angular/cdk/layout";
import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {FoodData} from "../../../../data/foodData";
import {Food} from "../../../shared/models/food.model";
import {AnalyticsService} from "../../../shared/services/analytics.service";
import {AppService} from "../../../shared/services/app.service";

@Component({
    selector: "fds-highlight-selector",
    templateUrl: "./highlight-selector.component.html",
    styleUrls: ["./highlight-selector.component.scss"],
})
export class HighlightSelectorComponent implements OnInit, OnDestroy {
    @Input() public openHighlighter: boolean;
    public highlightTypes: Food[] = FoodData;
    public highlight: Food = this.highlightTypes[0];
    public deviceIsTabled: boolean;
    private readonly breakpointSubscription: Subscription;

    public constructor(public readonly appService: AppService,
                       private readonly breakpointObserver: BreakpointObserver,
                       private readonly analyticsService: AnalyticsService) {
        this.breakpointSubscription = breakpointObserver.observe("(min-width: 599px)").subscribe((result) => {
            this.deviceIsTabled = result.matches;
        });
    }

    public select(key: string): void {
        this.analyticsService.highlight(key);
    }

    public ngOnInit(): void {
        // empty
    }

    public ngOnDestroy(): void {
        this.breakpointSubscription.unsubscribe();
    }

}
