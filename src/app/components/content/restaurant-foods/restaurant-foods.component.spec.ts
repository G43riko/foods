import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../shared/modules/testing.module";

import {SearchFoodPipe} from "../../../shared/pipes/search-food.pipe";
import {FoodRowLikesComponent} from "../food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "../food-row-name/food-row-name.component";
import {FoodRowComponent} from "../food-row/food-row.component";
import {RestaurantFoodsComponent} from "./restaurant-foods.component";

describe("RestaurantFoodsComponent", () => {
    let component: RestaurantFoodsComponent;
    let fixture: ComponentFixture<RestaurantFoodsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RestaurantFoodsComponent,
                SearchFoodPipe,
                FoodRowNameComponent,
                FoodRowLikesComponent,
                FoodRowComponent,
            ],
            imports: [
                TestingModule,
            ],
        }).compileComponents();
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
