import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Food} from "../../../shared/models/food.model";
import {Restaurant} from "../../../shared/models/restaurant.model";
import {AppService} from "../../../shared/services/app.service";

declare const $;

@Component({
    selector: "app-restaurant-foods",
    templateUrl: "./restaurant-foods.component.html",
    styleUrls: ["./restaurant-foods.component.scss"],
})
export class RestaurantFoodsComponent implements OnChanges, OnInit {
    @Input() public highlight: Food = new Food();
    @Input() public searchKey: string;
    @Input() public dailyMenus: any;
    @Input() public restaurant: Restaurant = new Restaurant();

    public constructor(public readonly appService: AppService) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        // empty
    }

    public ngOnInit(): void {
        // empty
    }

    private showImage(name: string, src: string): void {
        if (Math.random() < 2) {
            return;
        }
        const modal = $(".ui.modal.foodImage");
        modal.find(".header").text(name);
        modal.find("img").attr("src", src);
        modal.modal("show");
    }
}
