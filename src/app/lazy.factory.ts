import {InjectionToken} from "@angular/core";

export interface LazyModules {
    content: string;
    options: string;
    preference: string;
    restaurants: string;
}

export const lazyMap: LazyModules = {
    content: "src/app/components/content/content.module#ContentModule",
    options: "src/app/components/options/options.module#OptionsModule",
    preference: "src/app/components/preference/preference.module#PreferenceModule",
    restaurants: "src/app/components/restaurant-selector/restaurant-selector.module#RestaurantSelectorModule",
};

export const LAZY_MODULES_MAP = new InjectionToken("LAZY_MODULES_MAP", {
    factory: () => lazyMap,
});
