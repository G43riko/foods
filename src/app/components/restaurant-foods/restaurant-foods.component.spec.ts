import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {RestaurantFoodsComponent} from "./restaurant-foods.component";
import {SearchPipe} from "../../pipes/search.pipe";

describe("RestaurantFoodsComponent", () => {
    let component: RestaurantFoodsComponent;
    let fixture: ComponentFixture<RestaurantFoodsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RestaurantFoodsComponent, SearchPipe]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RestaurantFoodsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
