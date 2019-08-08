import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {Config} from "../../appConfig";
import {Food} from "../../shared/models/food.model";
import {Restaurant} from "../../shared/models/restaurant.model";
import {AppService} from "../../shared/services/app.service";
import {GeoLocationService} from "../../shared/services/geo-location.service";
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
    @ViewChild("restaurantTable") public restaurantTable: ElementRef<HTMLTableElement>;

    public constructor(public readonly appService: AppService,
                       public readonly getLocationService: GeoLocationService) {
    }

    public isBold(key: string): boolean {
        return FoodUtils.isBold(key);
    }

    public isHighlighted(title: string): boolean {
        if (FoodUtils.isBold(title)) {
            return false;
        }

        return this.highlight.include.some((item) => StringUtils.removeAccentedCharacters(title).toLowerCase().indexOf(item) >= 0) &&
            this.highlight.exclude.every((item) => StringUtils.removeAccentedCharacters(title).toLowerCase().indexOf(item) < 0);
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

    public showImages(contentHtml: string): string {
        return contentHtml.replace(/(guláš)/gi, "<u title='grilovanyEncian' class='https://www.pizzamarro.sk/images/salad/gril-encian.png'>$1</u>");
    }

    private getGoogleImagesLinkFor(dailyMenu: string): string {
        return `https://www.google.sk/search?q=${encodeURIComponent(dailyMenu)}&tbm=isch`;
    }

    private openImages(elementWrapper: HTMLSpanElement): void {
        window.open(this.getGoogleImagesLinkFor(elementWrapper.innerText), "_blank");
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
