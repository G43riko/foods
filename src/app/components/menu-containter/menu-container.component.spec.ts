import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MenuDrawerComponent} from "../menu-drawer/menu-drawer.component";

import {MenuContainerComponent} from "./menu-container.component";

describe("MenuContainterComponent", () => {
    let component: MenuContainerComponent;
    let fixture: ComponentFixture<MenuContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MenuContainerComponent,
                MenuDrawerComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
