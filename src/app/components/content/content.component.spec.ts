import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FirebaseModule} from "../../shared/modules/firebase.module";
import {TestingModule} from "../../shared/modules/testing.module";

import {FoodRowLikesComponent} from "./components/food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "./components/food-row-name/food-row-name.component";
import {FoodRowComponent} from "./components/food-row/food-row.component";
import {RestaurantFoodsComponent} from "./components/restaurant-foods/restaurant-foods.component";
import {RestaurantIframeComponent} from "./components/restaurant-iframe/restaurant-iframe.component";
import {RestaurantTitleComponent} from "./components/restaurant-title/restaurant-title.component";
import {ContentComponent} from "./content.component";
import {SafePipe} from "./pipes/safe.pipe";
import {SearchFoodPipe} from "./pipes/search-food.pipe";

describe("ContentComponent", () => {
    let component: ContentComponent;
    let fixture: ComponentFixture<ContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ContentComponent,
                RestaurantTitleComponent,
                RestaurantFoodsComponent,
                SafePipe,
                FoodRowComponent,
                SearchFoodPipe,
                RestaurantIframeComponent,
                FoodRowNameComponent,
                FoodRowLikesComponent,
            ],
            imports: [
                TestingModule,
                FirebaseModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
