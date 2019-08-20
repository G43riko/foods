import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Colors} from "../../../../shared/models/colors.enum";
import {AppService} from "../../../../shared/services/app.service";
import {AuthService} from "../../../../shared/services/auth.service";

declare const $;

@Component({
    selector: "fds-options",
    templateUrl: "./options.component.html",
    styleUrls: ["./options.component.scss"],
})
export class OptionsComponent implements OnInit, OnDestroy {
    public readonly allowedColors: string[] = Object.keys(Colors);
    private readonly userSubscription: Subscription;
    public constructor(public readonly appService: AppService,
                       public readonly authService: AuthService) {
        this.userSubscription = this.authService.user$.subscribe(() => {
            setTimeout(() => {
                $(".checkbox").checkbox();
                $(".ui.dropdown.selected-color").dropdown({
                    onChange(value): void {
                        appService.setConfig("selectedColor", (Colors[value] || "") as Colors);
                    },
                });
            }, 100);
        });
    }

    public ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    public ngOnInit(): void {
        // empty
    }

    public resetRestaurants(): void {
        // empty
    }

    public resetOptions(): void {
        this.appService.reset();

        setTimeout(() => {
            const dropDown = $(".ui.dropdown.selected-color");
            dropDown.dropdown("set selected", this.appService.getConfig("selectedColor"));
            dropDown.dropdown("set text", dropDown.dropdown("get item", dropDown.dropdown("get value")).html());
        });
    }
}
