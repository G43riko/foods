import {Component, HostListener, OnInit} from "@angular/core";

@Component({
    selector: "app-restaurant-selector",
    templateUrl: "./restaurant-selector.component.html",
    styleUrls: ["./restaurant-selector.component.css"]
})
export class RestaurantSelectorComponent implements OnInit {
    public constructor() {
        console.log("RestaurantSelectorComponent constructor");
    }

    public ngOnInit() {
        console.log("RestaurantSelectorComponent ngOnInit");
    }

    @HostListener("document:click", ["$event"]) public onClick(target: any) {
        if (target.target.matches("#opener")) {
            document.getElementById("sideNav").classList.add("visible");
        }
    }
}
