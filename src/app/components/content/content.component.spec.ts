import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FirebaseModule} from "../../shared/modules/firebase.module";
import {TestingModule} from "../../shared/modules/testing.module";
import {SharedPipesModule} from "../../shared/pipes/shared-pipes.module";

import {ContentComponent} from "./content.component";
import {FoodRowLikesComponent} from "./food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "./food-row-name/food-row-name.component";
import {FoodRowComponent} from "./food-row/food-row.component";
import {RestaurantFoodsComponent} from "./restaurant-foods/restaurant-foods.component";
import {RestaurantTitleComponent} from "./restaurant-title/restaurant-title.component";

describe("ContentComponent", () => {
    let component: ContentComponent;
    let fixture: ComponentFixture<ContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ContentComponent,
                RestaurantTitleComponent,
                RestaurantFoodsComponent,
                FoodRowComponent,
                FoodRowNameComponent,
                FoodRowLikesComponent,
            ],
            imports: [
                SharedPipesModule,
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
