import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../shared/modules/testing.module";
import {RestaurantService} from "../../shared/services/restaurant.service";
import {OptionsComponent} from "../options/options.component";
import {RestaurantListRowComponent} from "./restaurant-list-row/restaurant-list-row.component";

import {RestaurantListComponent} from "./restaurant-list.component";

describe("RestaurantListComponent", () => {
    let component: RestaurantListComponent;
    let fixture: ComponentFixture<RestaurantListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RestaurantListComponent,
                RestaurantListRowComponent,
                OptionsComponent,
            ],
            imports: [
                TestingModule,
            ],
            providers: [
                RestaurantService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RestaurantListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
