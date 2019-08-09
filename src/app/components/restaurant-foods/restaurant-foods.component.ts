import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Config} from "../../appConfig";
import {Food} from "../../shared/models/food.model";
import {Restaurant} from "../../shared/models/restaurant.model";
import {AppService} from "../../shared/services/app.service";
import {AuthService} from "../../shared/services/auth.service";
import {GeoLocationService} from "../../shared/services/geo-location.service";
import {RatingService} from "../../shared/services/rating.service";
import {FoodUtils} from "../../shared/utils/food-utils";
import {StringUtils} from "../../shared/utils/StringUtils";

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
    // @ViewChild("restaurantTable") public restaurantTable: ElementRef<HTMLTableElement>;

    public constructor(public readonly appService: AppService,
                       public readonly getLocationService: GeoLocationService) {
    }

    public showMap(restaurant: Restaurant): void {
        const modal = $(".ui.modal.maps");
        const url = `https://www.google.com/maps/embed/v1/place?&q=${restaurant.coordinates.lat},${restaurant.coordinates.long}&zoom=18&key=${Config.GOOGLE_MAPS_API_EMBED_KEY}`;
        modal.find("iframe").attr("src", url);
        modal.modal("show");
    }

    public ngOnChanges(changes: SimpleChanges): void {
    }
    public ngOnInit(): void {
        /*
        $(".foodTable").click((event) => {
            this.showImage(event.target.getAttribute("title"), event.target.getAttribute("class"));
        });
        */
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
