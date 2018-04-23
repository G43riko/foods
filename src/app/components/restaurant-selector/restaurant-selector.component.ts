import {Component, HostListener, OnInit} from "@angular/core";

@Component({
    selector: "app-restaurant-selector",
    templateUrl: "./restaurant-selector.component.html",
    styleUrls: ["./restaurant-selector.component.scss"]
})
export class RestaurantSelectorComponent implements OnInit {
    public constructor() {
    }

    public ngOnInit() {
    }

    @HostListener("document:click", ["$event"]) public onClick(target: any) {
        if (target.target.matches("#opener")) {
            const sideNav = document.getElementById("sideNav");
            if (sideNav) {
                sideNav.classList.add("visible");
            }
        }
    }
}
