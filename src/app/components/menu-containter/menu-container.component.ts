import {Component, ContentChild, HostListener, Input, OnInit} from "@angular/core";
import {MenuDrawerComponent} from "../menu-drawer/menu-drawer.component";

@Component({
    selector: "app-menu-container",
    templateUrl: "./menu-container.component.html",
    styleUrls: ["./menu-container.component.scss"],
})
export class MenuContainerComponent implements OnInit {
    public visible = false;
    @Input() public menuWidth = 160;
    @Input() public menuType: "classic" | "moving" = "classic";
    @Input() private backdrop = true;
    @Input() public filter;
    @ContentChild(MenuDrawerComponent, {static: false}) public content: MenuDrawerComponent;

    public get hasBackdrop(): boolean {
        return this.backdrop;
    }

    public get isShowingBackdrop(): boolean {
        return this.backdrop && this.visible;
    }

    public get realFilter(): string {
        if (!this.filter || !this.hasBackdrop) {
            return "none";
        }

        return this.filter;
    }

    public ngOnInit(): void {
    }

    public toggle(): void {
        this.visible = !this.visible;
    }

    @HostListener("document:keydown.escape")
    public onBackdropClicked(): void {
        this.visible = false;
    }
}
