import {DragDropModule} from "@angular/cdk/drag-drop";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FeedbackContentComponent} from "../layout/feedback-content/feedback-content.component";
import {FeedbackPanelComponent} from "../layout/feedback-panel/feedback-panel.component";
import {ProfileMenuComponent} from "../layout/profile-menu/profile-menu.component";
import {TopMenuComponent} from "../layout/top-menu/top-menu.component";
import {SharedComponentsModule} from "../shared/components/shared-components.module";
import {TestingModule} from "../shared/modules/testing.module";
import {RestaurantService} from "../shared/services/restaurant.service";
import {FoodRowLikesComponent} from "./content/components/food-row-likes/food-row-likes.component";
import {FoodRowNameComponent} from "./content/components/food-row-name/food-row-name.component";
import {FoodRowComponent} from "./content/components/food-row/food-row.component";
import {RestaurantFoodsComponent} from "./content/components/restaurant-foods/restaurant-foods.component";
import {RestaurantIframeComponent} from "./content/components/restaurant-iframe/restaurant-iframe.component";
import {RestaurantTitleComponent} from "./content/components/restaurant-title/restaurant-title.component";
import {ContentComponent} from "./content/content.component";
import {SafePipe} from "./content/pipes/safe.pipe";
import {SearchFoodPipe} from "./content/pipes/search-food.pipe";

import {FoodsComponent} from "./foods.component";
import {OptionCheckboxComponent} from "./options/option-checkbox/option-checkbox.component";
import {OptionsComponent} from "./options/options.component";
import {HighlightSelectorComponent} from "./preference/highlight-selector/highlight-selector.component";
import {PreferenceWrapperComponent} from "./preference/preference-wrapper/preference-wrapper.component";
import {RestaurantSelectorRowComponent} from "./restaurant-selector/restaurant-selector-row/restaurant-selector-row.component";
import {RestaurantSelectorComponent} from "./restaurant-selector/restaurant-selector.component";
import {SearchRestaurantPipe} from "./restaurant-selector/search-restaurant.pipe";

describe("FoodsComponent", () => {
    let component: FoodsComponent;
    let fixture: ComponentFixture<FoodsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FoodsComponent,
                RestaurantSelectorComponent,
                OptionCheckboxComponent,
                OptionsComponent,
                PreferenceWrapperComponent,
                TopMenuComponent,
                RestaurantIframeComponent,
                FeedbackPanelComponent,
                SafePipe,
                HighlightSelectorComponent,
                ContentComponent,
                SearchRestaurantPipe,
                RestaurantSelectorRowComponent,
                ProfileMenuComponent,
                RestaurantFoodsComponent,
                RestaurantTitleComponent,
                SearchFoodPipe,
                FoodRowComponent,
                FoodRowNameComponent,
                FoodRowLikesComponent,
                FeedbackContentComponent,
            ],
            providers: [
                RestaurantService,
            ],
            imports: [
                DragDropModule,
                SharedComponentsModule,
                TestingModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FoodsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
