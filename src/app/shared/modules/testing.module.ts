import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FirebaseModule} from "./firebase.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        FirebaseModule,
        HttpClientTestingModule,
    ],
})
export class TestingModule {
}
