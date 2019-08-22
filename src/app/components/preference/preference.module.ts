import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {HighlightSelectorComponent} from "./highlight-selector/highlight-selector.component";

@NgModule({
    declarations: [
        HighlightSelectorComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
    ],
    exports: [
        HighlightSelectorComponent,
    ],
})
export class PreferenceModule {
}
