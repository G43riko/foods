import {DragDropModule} from "@angular/cdk/drag-drop";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SharedComponentsModule} from "../../shared/components/shared-components.module";
import {TestingModule} from "../../shared/modules/testing.module";
import {RestaurantService} from "../../shared/services/restaurant.service";
import {RestaurantSelectorRowComponent} from "./restaurant-selector-row/restaurant-selector-row.component";

import {RestaurantSelectorComponent} from "./restaurant-selector.component";
import {SearchRestaurantPipe} from "./search-restaurant.pipe";

describe("RestaurantSelectorComponent", () => {
    let component: RestaurantSelectorComponent;
    let fixture: ComponentFixture<RestaurantSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RestaurantSelectorComponent,
                SearchRestaurantPipe,
                RestaurantSelectorRowComponent,
            ],
            providers: [
                RestaurantService,
            ],
            imports: [
                DragDropModule,
                SharedComponentsModule,
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
