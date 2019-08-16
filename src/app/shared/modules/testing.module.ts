import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateMockService} from "../tests/translate-mock.service";
import {FirebaseModule} from "./firebase.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TranslateModule.forRoot(),
    ],
    providers: [
        {provide: TranslateService, useClass: TranslateMockService},
    ],
    exports: [
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        FirebaseModule,
        HttpClientTestingModule,
    ],
})
export class TestingModule {
}
