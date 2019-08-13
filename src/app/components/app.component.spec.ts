import {DragDropModule} from "@angular/cdk/drag-drop";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {async, TestBed} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {TestingModule} from "../shared/modules/testing/testing.module";
import {SafePipe} from "../shared/pipes/safe.pipe";
import {SearchFoodPipe} from "../shared/pipes/search-food.pipe";
import {SearchRestaurantPipe} from "../shared/pipes/search-restaurant.pipe";
import {FoodsRestService} from "../shared/services/foods.rest.service";
import {StatsService} from "../shared/services/stats.service";
import {AppComponent} from "./app.component";
import {FoodRowLikesComponent} from "./food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "./food-row-name/food-row-name.component";
import {FoodRowComponent} from "./food-row/food-row.component";
import {HighlightSelectorComponent} from "./highlight-selector/highlight-selector.component";
import {OptionsComponent} from "./options/options.component";
import {PageTopNavBarComponent} from "./page-top-nav-bar/page-top-nav-bar.component";
import {ProfileMenuComponent} from "./profile-menu/profile-menu.component";
import {RestaurantFoodsComponent} from "./restaurant-foods/restaurant-foods.component";
import {RestaurantSelectorComponent} from "./restaurant-selector/restaurant-selector.component";

describe("AppComponent", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                OptionsComponent,
                PageTopNavBarComponent,
                RestaurantFoodsComponent,
                ProfileMenuComponent,
                HighlightSelectorComponent,
                RestaurantSelectorComponent,
                FoodRowComponent,
                FoodRowNameComponent,
                FoodRowLikesComponent,
                SearchFoodPipe,
                SearchRestaurantPipe,
                SafePipe,
            ],
            providers: [
                FoodsRestService,
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
    it("should have as restaurants array of restaurants", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.restaurants).toEqual(jasmine.any(Array));
    }));
    it("should render title in a h1 tag", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("h1").textContent).toContain("Denné menu");
    }));
});
