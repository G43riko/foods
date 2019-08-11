import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-menu-drawer",
    templateUrl: "./menu-drawer.component.html",
    styleUrls: ["./menu-drawer.component.css"],
    host: {
        class: "menu-drawer",
    },
})
export class MenuDrawerComponent implements OnInit {
    public constructor() {
    }

    public ngOnInit(): void {
    }

}
