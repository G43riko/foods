import {DragDropModule} from "@angular/cdk/drag-drop";
import {async, TestBed} from "@angular/core/testing";
import {TestingModule} from "../shared/modules/testing/testing.module";
import {SafePipe} from "../shared/pipes/safe.pipe";
import {SearchFoodPipe} from "../shared/pipes/search-food.pipe";
import {SearchRestaurantPipe} from "../shared/pipes/search-restaurant.pipe";
import {FoodsExternalService} from "../shared/services/foods-external.service";
import {StatsService} from "../shared/services/stats.service";
import {AppComponent} from "./app.component";
import {ContentComponent} from "./content/content.component";
import {FoodRowLikesComponent} from "./food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "./food-row-name/food-row-name.component";
import {FoodRowComponent} from "./food-row/food-row.component";
import {HighlightSelectorComponent} from "./highlight-selector/highlight-selector.component";
import {OptionsComponent} from "./options/options.component";
import {ProfileMenuComponent} from "./profile-menu/profile-menu.component";
import {RestaurantFoodsComponent} from "./restaurant-foods/restaurant-foods.component";
import {RestaurantSelectorComponent} from "./restaurant-selector/restaurant-selector.component";
import {TopMenuComponent} from "./top-menu/top-menu.component";

describe("AppComponent", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RestaurantSelectorComponent,
                HighlightSelectorComponent,
                OptionsComponent,
                ContentComponent,
                TopMenuComponent,

                AppComponent,
                RestaurantFoodsComponent,
                ProfileMenuComponent,
                FoodRowComponent,
                FoodRowNameComponent,
                FoodRowLikesComponent,
                SearchFoodPipe,
                SearchRestaurantPipe,
                SafePipe,
            ],
            providers: [
                FoodsExternalService,
                StatsService,
            ],
            imports: [
                DragDropModule,
                TestingModule,
            ],
        }).compileComponents();
    }));
    it("should create the app", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it("should render title in a h1 tag", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("h1").textContent).toContain("Denné menu");
    }));
});
