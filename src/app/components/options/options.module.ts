import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {ContentComponent} from "../content/content.component";
import {OptionsComponent} from "./options.component";

@NgModule({
    declarations: [
        OptionsModule.rootComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
    ],
    entryComponents: [
        OptionsModule.rootComponent,
    ],
    exports: [
        OptionsModule.rootComponent,
    ],
})
export class OptionsModule {
    public static readonly rootComponent = OptionsComponent;
}
