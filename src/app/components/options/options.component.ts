import {Component, OnInit} from "@angular/core";
import {Colors} from "../../shared/models/colors.enum";
import {AppService} from "../../shared/services/app.service";
import {AuthService} from "../../shared/services/auth.service";

declare const $;

@Component({
    selector: "app-options",
    templateUrl: "./options.component.html",
    styleUrls: ["./options.component.scss"],
})
export class OptionsComponent implements OnInit {
    public readonly allowedColors: string[] = Object.keys(Colors);

    public constructor(public readonly appService: AppService,
                       private readonly authService: AuthService) {
    }

    public ngOnInit(): void {
        const appService = this.appService;
        setTimeout(() => {
            $(".checkbox").checkbox();
            $(".ui.dropdown").dropdown({
                onChange(value, text, $selectedItem): void {
                    console.log(value, text, $selectedItem);
                    appService.setConfig("selectedColor", Colors[value] as Colors);
                    // appService.getConfig('selectedColor') = Colors[value] as Colors;
                },
            });
        }, 100);

    }

    public resetRestaurants(): void {
    }

    public resetOptions(): void {
        this.appService.reset();

        setTimeout(() => {
            const dropDown = $(".ui.dropdown");
            dropDown.dropdown("set selected", this.appService.getConfig('selectedColor'));
            dropDown.dropdown("set text", dropDown.dropdown("get item", dropDown.dropdown("get value")).html());
        });
    }
}
