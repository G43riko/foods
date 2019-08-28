import {BreakpointObserver} from "@angular/cdk/layout";
import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Subscription} from "rxjs";
import {Food} from "../../../shared/models/food.model";
import {HighlightSelectorComponent} from "../highlight-selector/highlight-selector.component";

@Component({
    selector: "fds-preference-wrapper",
    templateUrl: "./preference-wrapper.component.html",
    styleUrls: ["./preference-wrapper.component.scss"],
})
export class PreferenceWrapperComponent implements OnInit, OnDestroy {
    @Input() public openHighlighter: boolean;
    public deviceIsTabled: boolean;
    private readonly breakpointSubscription: Subscription;
    @ViewChild(HighlightSelectorComponent, {static: true}) private highlightSelector: HighlightSelectorComponent;

    @Input()
    public set highlight(food: Food) {
        this.highlightSelector.highlight = food;
    }

    public get highlight(): Food {
        return this.highlightSelector.highlight;
    }

    public constructor(private readonly breakpointObserver: BreakpointObserver) {
        this.breakpointSubscription = breakpointObserver.observe("(min-width: 599px)").subscribe((result) => {
            this.deviceIsTabled = result.matches;
        });
    }

    public ngOnInit(): void {
        // empty
    }

    public ngOnDestroy(): void {
        this.breakpointSubscription.unsubscribe();
    }
}
