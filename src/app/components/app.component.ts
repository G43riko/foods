import {BreakpointObserver} from "@angular/cdk/layout";
import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {forkJoin} from "rxjs/internal/observable/forkJoin";
import {Dish} from "../shared/models/dish.model";
import {Restaurant} from "../shared/models/restaurant.model";
import {AppService} from "../shared/services/app.service";
import {FoodsRestService} from "../shared/services/foods.rest.service";
import {FoodsService} from "../shared/services/foods.service";
import {GeoLocationService} from "../shared/services/geo-location.service";
import {NotificationService} from "../shared/services/notification.service";
import {ParserService} from "../shared/services/parser.service";
import {RatingService} from "../shared/services/rating.service";
import {StatsService} from "../shared/services/stats.service";
import {StringUtils} from "../shared/utils/StringUtils";

declare const $: any;

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    public counter = 0;
    public dailyMenus: { [key: string]: Dish[] } = {};
    public wideNavigation: boolean;

    public constructor(private readonly statsService: StatsService,
                       private readonly breakpointObserver: BreakpointObserver) {
        // breakpointObserver.isMatched();
        breakpointObserver.observe("(min-width: 726px)").subscribe((result) => {
            this.wideNavigation = result.matches;
        });

    }

    public ngOnInit(): void {
        this.statsService.setVisit();
        $(".ui.sidebar.restaurants").sidebar("attach events", ".item.opener.restaurants");
        $(".ui.sidebar.options").sidebar("attach events", ".item.opener.options");
    }
}
