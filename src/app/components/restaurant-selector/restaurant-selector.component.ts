import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild} from "@angular/core";
import {RestaurantData} from "../../../data/restaurantsData";
import {FactoryModel} from "../../shared/models/factory.model";
import {Restaurant} from "../../shared/models/restaurant.model";

declare const $;

@Component({
    selector: "app-restaurant-selector",
    templateUrl: "./restaurant-selector.component.html",
    styleUrls: ["./restaurant-selector.component.scss"],
})
export class RestaurantSelectorComponent implements OnInit {
    public readonly restaurants: Restaurant[] = RestaurantData;
    @ViewChild("wrapper") public wrapper: ElementRef<HTMLDivElement>;
    @Output("restaurantsChange") public restaurantsChange: EventEmitter<Restaurant[]> = new EventEmitter<Restaurant[]>();
    public readonly selectedRestaurants: Restaurant[] = [];
    public searchKey: string;

    @HostListener("document:click", ["$event"])
    public onClick(target: any): void {
        if (!this.wrapper.nativeElement.contains(target.target)) {
            this.wrapper.nativeElement.classList.add("hidden");
        }
    }

    public toggleSidebar(): void {
        this.wrapper.nativeElement.classList.toggle("hidden");
    }

    public saveResults(data: string): void {
        const restaurantKeys = data.split(":");
        this.selectedRestaurants.splice(0, this.selectedRestaurants.length);

        this.restaurants.forEach((restaurant) => restaurant.visible = false);
        restaurantKeys.forEach((key) => {
            const restaurant = this.restaurants.find((actualRestaurant) => actualRestaurant.key === key);
            if (restaurant) {
                restaurant.visible = true;
                this.selectedRestaurants.push(restaurant);
            }
        });
        setTimeout(() => this.restaurantsChange.emit([...this.selectedRestaurants]), 0);
        localStorage.setItem("selectedRestaurants", JSON.stringify(restaurantKeys));
    }

    public initSortable(list, sbtn): void {
        const listObj = document.getElementById(list);
        const sbtnObj = document.getElementById(sbtn);
        const sortable = new FactoryModel(listObj);

        sbtnObj.addEventListener("click", (e) => {
            e.preventDefault();
            this.saveResults(sortable.toString("title"));
        });
    }

    public ngOnInit(): void {
        const storedData = JSON.parse(localStorage.getItem("selectedRestaurants")) || [];
        if (storedData.length === 0) {
            this.selectedRestaurants.push(...this.restaurants.filter((restaurant) => restaurant.visible));

        }
        else {
            this.restaurants.forEach((restaurant) => restaurant.visible = false);
            storedData.forEach((restaurantKey) => {
                const restaurant = this.restaurants.find((actualRestaurant) => actualRestaurant.key === restaurantKey);
                restaurant.visible = true;
                this.selectedRestaurants.push(restaurant);
            });
        }

        setTimeout(() => this.restaurantsChange.emit(this.selectedRestaurants), 0);

        this.sorter();
    }

    private sorter(): void {
        ((name, factory) => {
            if (typeof window === "object") {
                window[name] = factory();
                if (typeof $ === "object") {
                    $.fn[name] = function (options): any {
                        return this.each(function (): void {
                            new window[name](this, options);
                        });
                    };
                }
            }

        })("Sortable", () => {
            return FactoryModel;
        });

        this.initSortable("list-1", "sbtn-1");
        this.initSortable("list-2", "sbtn-2");
    }
}
