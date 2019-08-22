import {DragDropModule} from "@angular/cdk/drag-drop";
import {async, TestBed} from "@angular/core/testing";
import {TestingModule} from "./shared/modules/testing.module";
import {SafePipe} from "./components/content/pipes/safe.pipe";
import {SearchFoodPipe} from "./components/content/pipes/search-food.pipe";
import {SearchRestaurantPipe} from "./components/restaurant-selector/search-restaurant.pipe";
import {FoodsExternalService} from "./shared/services/foods-external.service";
import {StatsService} from "./shared/services/stats.service";
import {AppComponent} from "./app.component";
import {ContentComponent} from "./components/content/content.component";
import {FoodRowLikesComponent} from "./components/content/components/food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "./components/content/components/food-row-name/food-row-name.component";
import {FoodRowComponent} from "./components/content/components/food-row/food-row.component";
import {RestaurantFoodsComponent} from "./components/content/components/restaurant-foods/restaurant-foods.component";
import {RestaurantTitleComponent} from "./components/content/components/restaurant-title/restaurant-title.component";
import {ProfileMenuComponent} from "./layout/profile-menu/profile-menu.component";
import {HighlightSelectorComponent} from "./components/preference/highlight-selector/highlight-selector.component";
import {OptionsComponent} from "./components/options/options.component";
import {RestaurantSelectorComponent} from "./components/restaurant-selector/restaurant-selector.component";
import {RestaurantSelectorModule} from "./components/restaurant-selector/restaurant-selector.module";
import {TopMenuComponent} from "./layout/top-menu/top-menu.component";

describe("AppComponent", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HighlightSelectorComponent,
                OptionsComponent,
                ContentComponent,
                TopMenuComponent,

                RestaurantTitleComponent,
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
                RestaurantSelectorModule,
                DragDropModule,
                TestingModule,
            ],
        }).compileComponents();
    }));
    xit("should create the app", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    xit("should render title in a h1 tag", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("h1").textContent).toContain("dailyMenus");
    }));
});
