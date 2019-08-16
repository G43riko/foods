import {DragDropModule} from "@angular/cdk/drag-drop";
import {async, TestBed} from "@angular/core/testing";
import {TestingModule} from "../shared/modules/testing.module";
import {SafePipe} from "../shared/pipes/safe.pipe";
import {SearchFoodPipe} from "../shared/pipes/search-food.pipe";
import {SearchRestaurantPipe} from "../shared/pipes/search-restaurant.pipe";
import {FoodsExternalService} from "../shared/services/foods-external.service";
import {StatsService} from "../shared/services/stats.service";
import {AppComponent} from "./app.component";
import {ContentComponent} from "./content/content.component";
import {FoodRowLikesComponent} from "./content/food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "./content/food-row-name/food-row-name.component";
import {FoodRowComponent} from "./content/food-row/food-row.component";
import {RestaurantFoodsComponent} from "./content/restaurant-foods/restaurant-foods.component";
import {RestaurantTitleComponent} from "./content/restaurant-title/restaurant-title.component";
import {ProfileMenuComponent} from "./layout/profile-menu/profile-menu.component";
import {HighlightSelectorComponent} from "./layout/sidebars/highlight-selector/highlight-selector.component";
import {OptionsComponent} from "./layout/sidebars/options/options.component";
import {RestaurantSelectorComponent} from "./layout/sidebars/restaurant-selector/restaurant-selector.component";
import {TopMenuComponent} from "./layout/top-menu/top-menu.component";

describe("AppComponent", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RestaurantSelectorComponent,
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
