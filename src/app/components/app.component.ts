import {BreakpointObserver} from "@angular/cdk/layout";
import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Dish} from "../shared/models/dish.model";
import {AppService} from "../shared/services/app.service";
import {StatsService} from "../shared/services/stats.service";

declare const $: any;

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    public counter = 0;
    public dailyMenus: { [key: string]: Dish[] } = {};

    public biggerThanTablet: boolean;

    public constructor(private readonly statsService: StatsService,
                       translateService: TranslateService,
                       private readonly appService: AppService,
                       private readonly breakpointObserver: BreakpointObserver) {
        breakpointObserver.observe("(min-width: 726px)").subscribe((result) => {
            this.biggerThanTablet = result.matches;
        });
    }

    public ngOnInit(): void {
        this.statsService.setVisit();
        $(".ui.sidebar.restaurants").sidebar("attach events", ".item.opener.restaurants");
        $(".ui.sidebar.options").sidebar("attach events", ".item.opener.options");
    }
}
