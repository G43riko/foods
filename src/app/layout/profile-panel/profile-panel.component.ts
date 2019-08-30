import {Component, OnInit} from "@angular/core";
import {AppService} from "../../shared/services/app.service";
import {AuthService} from "../../shared/services/auth.service";

declare const $: any;

@Component({
    selector: "fds-profile-panel",
    templateUrl: "./profile-panel.component.html",
    styleUrls: ["./profile-panel.component.scss"],
})
export class ProfilePanelComponent implements OnInit {
    public readonly languages = [
        {
            key: "sk",
            name: "Slovak",
            icon: "sk",
        },
        {
            key: "en",
            name: "English",
            icon: "us",
        },
        {
            key: "de",
            name: "German",
            icon: "de",
        },
    ];
    public constructor(public readonly authService: AuthService,
                       public readonly appService: AppService) {
    }

    public ngOnInit() {
        setTimeout(() => $(".ui.dropdown.language.profile").dropdown({
            onChange: (language) => {
                this.appService.setConfig("language", language);
            },
        }), 1000);
    }

}
