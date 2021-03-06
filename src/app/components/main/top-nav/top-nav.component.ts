import {Component, Input, OnInit} from "@angular/core";
import {Food} from "../../../shared/models/food.model";
import {AppService} from "../../../shared/services/app.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
    selector: "fds-top-nav",
    templateUrl: "./top-nav.component.html",
    styleUrls: ["./top-nav.component.scss"],
    host: {
        style: "display: contents",
    },
})
export class TopNavComponent implements OnInit {
    @Input() public biggerThanTablet: boolean;
    @Input() public highlight: Food;
    public searchKey: string;
    public openHighlighter = false;

    public constructor(public readonly appService: AppService,
                       public readonly authService: AuthService) {
    }

    public ngOnInit(): void {
        // empty
    }
}
