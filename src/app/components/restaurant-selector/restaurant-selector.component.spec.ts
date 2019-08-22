import {DragDropModule} from "@angular/cdk/drag-drop";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../shared/modules/testing.module";
import {SearchRestaurantPipe} from "./search-restaurant.pipe";

import {RestaurantSelectorComponent} from "./restaurant-selector.component";

describe("RestaurantSelectorComponent", () => {
    let component: RestaurantSelectorComponent;
    let fixture: ComponentFixture<RestaurantSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RestaurantSelectorComponent,
                SearchRestaurantPipe,
            ],
            imports: [
                DragDropModule,
                TestingModule,
            ],
        }).compileComponents();
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
