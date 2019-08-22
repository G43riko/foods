import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FirebaseModule} from "../../../../shared/modules/firebase.module";
import {TestingModule} from "../../../../shared/modules/testing.module";

import {RestaurantTitleComponent} from "./restaurant-title.component";

describe("RestaurantTitleComponent", () => {
    let component: RestaurantTitleComponent;
    let fixture: ComponentFixture<RestaurantTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FirebaseModule,
                TestingModule,
            ],
            declarations: [
                RestaurantTitleComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RestaurantTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
