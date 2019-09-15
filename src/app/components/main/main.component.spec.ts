import {DragDropModule} from "@angular/cdk/drag-drop";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MenuModule} from "@g43/menu";
import {FeedbackContentComponent} from "../../layout/feedback-content/feedback-content.component";
import {FeedbackPanelComponent} from "../../layout/feedback-panel/feedback-panel.component";
import {ProfilePanelComponent} from "../../layout/profile-panel/profile-panel.component";
import {SharedComponentsModule} from "../../shared/components/shared-components.module";
import {TestingModule} from "../../shared/modules/testing.module";
import {RestaurantService} from "../../shared/services/restaurant.service";
import {FoodRowLikesComponent} from "../content/components/food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "../content/components/food-row-name/food-row-name.component";
import {FoodRowComponent} from "../content/components/food-row/food-row.component";
import {RestaurantFoodsComponent} from "../content/components/restaurant-foods/restaurant-foods.component";
import {RestaurantIframeComponent} from "../content/components/restaurant-iframe/restaurant-iframe.component";
import {RestaurantTitleComponent} from "../content/components/restaurant-title/restaurant-title.component";
import {ContentComponent} from "../content/content.component";
import {SafePipe} from "../content/pipes/safe.pipe";
import {SearchFoodPipe} from "../content/pipes/search-food.pipe";
import {OptionCheckboxComponent} from "../options/option-checkbox/option-checkbox.component";
import {OptionsComponent} from "../options/options.component";
import {HighlightSelectorComponent} from "../preference/highlight-selector/highlight-selector.component";
import {RestaurantSelectorRowComponent} from "../restaurant-selector/restaurant-selector-row/restaurant-selector-row.component";
import {RestaurantSelectorComponent} from "../restaurant-selector/restaurant-selector.component";
import {SearchRestaurantPipe} from "../restaurant-selector/search-restaurant.pipe";

import {MainComponent} from "./main.component";
import {ProfileIconComponent} from "./profile-icon/profile-icon.component";

describe("MainComponent", () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MainComponent,
                ProfilePanelComponent,
                FeedbackContentComponent,
                FeedbackPanelComponent,
                ProfileIconComponent,
                HighlightSelectorComponent,
                RestaurantSelectorComponent,
                OptionsComponent,
                ContentComponent,
                SearchRestaurantPipe,
                RestaurantSelectorRowComponent,
                OptionCheckboxComponent,
                RestaurantFoodsComponent,
                RestaurantIframeComponent,
                RestaurantTitleComponent,
                SearchFoodPipe,
                FoodRowComponent,
                SafePipe,
                FoodRowComponent,
                FoodRowNameComponent,
                FoodRowLikesComponent,
            ],
            imports: [
                MenuModule,
                DragDropModule,
                SharedComponentsModule,
                TestingModule,
            ],
            providers: [
                RestaurantService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
