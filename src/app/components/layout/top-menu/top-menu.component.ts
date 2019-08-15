import {Component, Input, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {AppService} from "../../../shared/services/app.service";

declare const $: any;

@Component({
    selector: "app-top-menu",
    templateUrl: "./top-menu.component.html",
    styleUrls: ["./top-menu.component.scss"],
})
export class TopMenuComponent implements OnInit {
    @Input() public biggerThanTablet: boolean;
    public searchKey: string;
    public openHighlighter = false;

    public constructor(public readonly appService: AppService,
                       public readonly translateService: TranslateService) {
    }

    public ngOnInit(): void {
        setTimeout(() => $(".ui.dropdown.language").dropdown(), 100);
        // empty
    }

    public setLanguage(language: string): void {
        this.appService.setConfig("language", language);
    }
}
