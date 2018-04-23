import {TestBed, async} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {PageNavBarComponent} from "./page-nav-bar/page-nav-bar.component";
import {RestaurantFoodsComponent} from "./restaurant-foods/restaurant-foods.component";
import {RestaurantSelectorComponent} from "./restaurant-selector/restaurant-selector.component";
import {FormsModule} from "@angular/forms";
import {SearchPipe} from "../pipes/search.pipe";
import {FoodsService} from "../services/foods.service";
import {HttpClientModule} from "@angular/common/http";
import {StatsService} from "../services/stats.service";

declare const $: any;

describe("AppComponent", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                PageNavBarComponent,
                RestaurantFoodsComponent,
                RestaurantSelectorComponent,
                SearchPipe,
            ],
            providers: [
                FoodsService,
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
