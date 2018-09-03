import {Component, OnInit} from "@angular/core";
import {Colors} from "../../shared/models/colors.enum";
import {AppService} from "../../shared/services/app.service";

declare const $;

@Component({
    selector: "app-options",
    templateUrl: "./options.component.html",
    styleUrls: ["./options.component.css"],
})
export class OptionsComponent implements OnInit {
    public readonly allowedColors: string[] = Object.keys(Colors);

    public constructor(public readonly appService: AppService) {
    }

    public ngOnInit(): void {
        const appService = this.appService;
        setTimeout(() =>
            $(".ui.dropdown").dropdown({
                onChange(value, text, $selectedItem): void {
                    console.log(value, text, $selectedItem);
                    appService.selectedColor = Colors[value] as Colors;
                },
            }), 100);
    }

    public resetRestaurants(): void {
    }

    public resetOptions(): void {
        this.appService.reset();

        setTimeout(() => {
            $(".ui.dropdown").dropdown("set selected", this.appService.selectedColor);
            $(".ui.dropdown").dropdown("set text", $(".ui.dropdown").dropdown("get item", $(".ui.dropdown").dropdown("get value")).html())
        });
    }
}
