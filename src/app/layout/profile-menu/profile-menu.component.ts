import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {AppService} from "../../shared/services/app.service";
import {AuthService} from "../../shared/services/auth.service";

declare const $: any;

@Component({
    selector: "fds-profile-menu",
    templateUrl: "./profile-menu.component.html",
    styleUrls: ["./profile-menu.component.scss"],
})
export class ProfileMenuComponent implements OnInit {
    public menuOpen = false;
    @Output() public readonly onOpen = new EventEmitter();
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

    public open(): void {
        this.menuOpen = true;
        this.onOpen.emit();
        setTimeout(() => $(".ui.dropdown.language.profile").dropdown({
            onChange: (language) => {
                this.appService.setConfig("language", language);
            },
        }), 0);
    }

    public close(): void {
        this.menuOpen = false;
    }

    public ngOnInit(): void {
        // empty
    }

}
