import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
    selector: "app-profile-menu",
    templateUrl: "./profile-menu.component.html",
    styleUrls: ["./profile-menu.component.scss"],
})
export class ProfileMenuComponent implements OnInit {
    public menuOpen = false;
    @Output() public readonly onOpen = new EventEmitter();
    public constructor(public readonly authService: AuthService) {
    }

    public open(): void {
        this.menuOpen = true;
        this.onOpen.emit();
    }
    public close(): void {
        this.menuOpen = false;
    }
    public ngOnInit(): void {
    }

}
