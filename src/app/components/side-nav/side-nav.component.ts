import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild} from "@angular/core";
import {Restaurant} from "../../shared/models/restaurant.model";

type allowedComponents = "restaurants" | "options";

@Component({
    selector: "app-side-nav",
    templateUrl: "./side-nav.component.html",
    styleUrls: ["./side-nav.component.scss"],
})
export class SideNavComponent implements OnInit {
    @ViewChild("wrapper") public wrapper: ElementRef<HTMLDivElement>;
    @Output("restaurantsChange") public restaurantsChange: EventEmitter<Restaurant[]> = new EventEmitter<Restaurant[]>();
    public visibleComponent: allowedComponents;
    public constructor() {
    }

    @HostListener("document:click", ["$event"])
    public onClick(target: any): void {
        if (!this.wrapper.nativeElement.contains(target.target)) {
            this.wrapper.nativeElement.classList.add("hidden");
            delete this.visibleComponent;
        }
    }

    public ngOnInit(): void {
    }

    public show(type: allowedComponents): void {
        if (this.visibleComponent === type) {
            this.wrapper.nativeElement.classList.toggle("hidden");
            delete this.visibleComponent;
        }
        else {
            this.wrapper.nativeElement.classList.remove("hidden");
            this.visibleComponent = type;
        }
    }

}
