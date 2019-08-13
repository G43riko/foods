import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../shared/modules/testing/testing.module";
import {FoodRowLikesComponent} from "../food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "../food-row-name/food-row-name.component";

import {FoodRowComponent} from "./food-row.component";

describe("FoodRowComponent", () => {
    let component: FoodRowComponent;
    let fixture: ComponentFixture<FoodRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FoodRowComponent,
                FoodRowNameComponent,
                FoodRowLikesComponent,
            ],
            imports: [
                TestingModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FoodRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
