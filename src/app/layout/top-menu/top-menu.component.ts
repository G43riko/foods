import {Component, Input, OnInit} from "@angular/core";
import {Food} from "../../shared/models/food.model";
import {AppService} from "../../shared/services/app.service";
import {AuthService} from "../../shared/services/auth.service";
import {RemoteConfigService} from "../../shared/services/remote-config.service";

@Component({
    selector: "fds-top-menu",
    templateUrl: "./top-menu.component.html",
    styleUrls: ["./top-menu.component.scss"],
})
export class TopMenuComponent implements OnInit {
    @Input() public biggerThanTablet: boolean;
    @Input() public highlight: Food;
    public searchKey: string;
    public openHighlighter = false;

    public constructor(public readonly appService: AppService,
                       public readonly remoteConfigService: RemoteConfigService,
                       public readonly authService: AuthService) {
    }

    public ngOnInit(): void {
        // empty
    }
}
