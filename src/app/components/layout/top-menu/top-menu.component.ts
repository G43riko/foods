import {Component, Input, OnInit} from "@angular/core";
import {AppService} from "../../../shared/services/app.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
    selector: "fds-top-menu",
    templateUrl: "./top-menu.component.html",
    styleUrls: ["./top-menu.component.scss"],
})
export class TopMenuComponent implements OnInit {
    @Input() public biggerThanTablet: boolean;
    public searchKey: string;
    public openHighlighter = false;

    public constructor(public readonly appService: AppService,
                       public readonly authService: AuthService) {
    }

    public ngOnInit(): void {
        // empty
    }
}
