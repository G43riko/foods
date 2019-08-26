import {Component, Input, OnInit} from "@angular/core";
import {Restaurant} from "../../../../shared/models/restaurant.model";
import {AppService} from "../../../../shared/services/app.service";

@Component({
    selector: "fds-restaurant-iframe",
    templateUrl: "./restaurant-iframe.component.html",
    styleUrls: ["./restaurant-iframe.component.scss"],
})
export class RestaurantIframeComponent implements OnInit {

    @Input() public restaurant: Restaurant;

    public constructor(public readonly appService: AppService) {
    }

    public ngOnInit(): void {
        // empty
    }

    public getLinkFor(restaurant: Restaurant): string {
        if (restaurant.menuLink) {
            return restaurant.menuLink;
        }

        return `https://restauracie.sme.sk/restauracia${restaurant.restauracieSmeLink}`;
    }

}
