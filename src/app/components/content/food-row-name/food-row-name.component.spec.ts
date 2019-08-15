import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../shared/modules/testing.module";

import {FoodRowNameComponent} from "./food-row-name.component";

describe("FoodRowNameComponent", () => {
    let component: FoodRowNameComponent;
    let fixture: ComponentFixture<FoodRowNameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FoodRowNameComponent],
            imports: [
                TestingModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FoodRowNameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
