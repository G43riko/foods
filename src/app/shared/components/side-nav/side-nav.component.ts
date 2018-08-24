import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild} from "@angular/core";
import {Restaurant} from "../../models/restaurant.model";

@Component({
    selector: "app-side-nav",
    templateUrl: "./side-nav.component.html",
    styleUrls: ["./side-nav.component.scss"],
})
export class SideNavComponent implements OnInit {
    @ViewChild("wrapper") public wrapper: ElementRef<HTMLDivElement>;
    @Output("restaurantsChange") public restaurantsChange: EventEmitter<Restaurant[]> = new EventEmitter<Restaurant[]>();

    public constructor() {
    }

    @HostListener("document:click", ["$event"])
    public onClick(target: any): void {
        if (!this.wrapper.nativeElement.contains(target.target)) {
            this.wrapper.nativeElement.classList.add("hidden");
        }
    }

    public ngOnInit(): void {
    }

    public toggleSidebar(): void {
        this.wrapper.nativeElement.classList.toggle("hidden");
    }

}
