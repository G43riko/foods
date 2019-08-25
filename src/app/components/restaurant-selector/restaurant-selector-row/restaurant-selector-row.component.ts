import {Component, Input, OnInit} from "@angular/core";
import {Restaurant} from "../../../shared/models/restaurant.model";

@Component({
    selector: "fds-restaurant-selector-row",
    templateUrl: "./restaurant-selector-row.component.html",
    styleUrls: ["./restaurant-selector-row.component.scss"],
})
export class RestaurantSelectorRowComponent implements OnInit {
    @Input() public restaurant: Restaurant;

    public ngOnInit(): void {
        // empty
    }

}
