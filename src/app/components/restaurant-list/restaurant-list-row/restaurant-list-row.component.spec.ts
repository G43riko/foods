import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FirebaseModule} from "../../../shared/modules/firebase.module";
import {TestingModule} from "../../../shared/modules/testing.module";
import {RestaurantService} from "../../../shared/services/restaurant.service";

import {RestaurantListRowComponent} from "./restaurant-list-row.component";

describe("RestaurantListRowComponent", () => {
    let component: RestaurantListRowComponent;
    let fixture: ComponentFixture<RestaurantListRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RestaurantListRowComponent,
            ],
            imports: [
                TestingModule,
                FirebaseModule,
            ],
            providers: [
                RestaurantService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RestaurantListRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
