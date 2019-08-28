import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {HighlightSelectorComponent} from "./highlight-selector/highlight-selector.component";
import { PreferenceWrapperComponent } from "./preference-wrapper/preference-wrapper.component";

@NgModule({
    declarations: [
        HighlightSelectorComponent,
        PreferenceWrapperComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
    ],
    exports: [
        HighlightSelectorComponent,
        PreferenceWrapperComponent,
    ],
})
export class PreferenceModule {
}
