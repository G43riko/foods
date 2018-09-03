import {async, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {PageTopNavBarComponent} from "./page-top-nav-bar/page-top-nav-bar.component";
import {RestaurantFoodsComponent} from "./restaurant-foods/restaurant-foods.component";
import {RestaurantSelectorComponent} from "./restaurant-selector/restaurant-selector.component";
import {FormsModule} from "@angular/forms";
import {SearchFoodPipe} from "../shared/pipes/search-food.pipe";
import {FoodsRestService} from "../shared/services/foods.rest.service";
import {HttpClientModule} from "@angular/common/http";
import {StatsService} from "../shared/services/stats.service";

declare const $: any;

describe("AppComponent", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                PageTopNavBarComponent,
                RestaurantFoodsComponent,
                RestaurantSelectorComponent,
                SearchFoodPipe,
            ],
            providers: [
                FoodsRestService,
                StatsService
            ],
            imports: [
                FormsModule,
                HttpClientModule
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
