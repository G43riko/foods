import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../../shared/modules/testing.module";
import {SafePipe} from "../../pipes/safe.pipe";
import {RestaurantTitleComponent} from "../restaurant-title/restaurant-title.component";

import {RestaurantIframeComponent} from "./restaurant-iframe.component";

describe("RestaurantIframeComponent", () => {
    let component: RestaurantIframeComponent;
    let fixture: ComponentFixture<RestaurantIframeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RestaurantIframeComponent,
                RestaurantTitleComponent,
                SafePipe,
            ],
            imports: [
                TestingModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RestaurantIframeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
