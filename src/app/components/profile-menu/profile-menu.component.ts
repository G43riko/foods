import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: "app-profile-menu",
    templateUrl: "./profile-menu.component.html",
    styleUrls: ["./profile-menu.component.scss"],
})
export class ProfileMenuComponent implements OnInit {
    public menuOpen = false;
        public constructor(private readonly authService: AuthService) {
    }

    public ngOnInit(): void {
    }

}
