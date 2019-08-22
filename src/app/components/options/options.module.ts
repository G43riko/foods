import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {OptionsComponent} from "./options.component";

@NgModule({
    declarations: [
        OptionsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
    ],
    exports: [
        OptionsComponent,
    ],
})
export class OptionsModule {
}
