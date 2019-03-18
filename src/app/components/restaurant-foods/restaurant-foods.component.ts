import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {Food} from "../../shared/models/food.model";
import {Restaurant} from "../../shared/models/restaurant.model";
import {AppService} from "../../shared/services/app.service";
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

    public constructor(public readonly appService: AppService) {
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

    public ngOnChanges(changes: SimpleChanges): void {
        console.log("changes: ", changes);
        if (changes.dailyMenus) {
            console.log("teraz sa to meni: ", this.dailyMenus);
        }
        // window. = () => this.showImage("grilovanyEncian", "https://www.pizzamarro.sk/images/salad/gril-encian.png");

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
