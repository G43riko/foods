import {BreakpointObserver} from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import {delay} from "rxjs/operators";
import {Dish} from "../../shared/models/dish.model";
import {AppService} from "../../shared/services/app.service";
import {AuthService} from "../../shared/services/auth.service";
import {StatsService} from "../../shared/services/stats.service";

declare const $: any;

@Component({
  selector: "fds-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
    public counter = 0;
    public dailyMenus: { [key: string]: Dish[] } = {};

    public biggerThanTablet: boolean;

    public constructor(private readonly statsService: StatsService,
                       public readonly appService: AppService,
                       public readonly authService: AuthService,
                       private readonly breakpointObserver: BreakpointObserver) {
        breakpointObserver.observe("(min-width: 726px)").subscribe((result) => {
            this.biggerThanTablet = result.matches;
        });
    }

    public ngOnInit(): void {
        this.authService.user$.pipe(delay(10)).subscribe(() => {
            $(".ui.sidebar.options").sidebar("attach events", ".item.opener.options");
        });
        this.statsService.setVisit();
        $(".ui.sidebar.restaurants").sidebar("attach events", ".item.opener.restaurants");
    }
}
