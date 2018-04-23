import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {RestaurantSelectorComponent} from "./restaurant-selector.component";

describe("RestaurantSelectorComponent", () => {
    let component: RestaurantSelectorComponent;
    let fixture: ComponentFixture<RestaurantSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RestaurantSelectorComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RestaurantSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
