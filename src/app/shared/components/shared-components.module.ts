import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "./button/button.component";
import {InputComponent} from "./input/input.component";

@NgModule({
    declarations: [
        ButtonComponent,
        InputComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
    ],
    exports: [
        ReactiveFormsModule,
        ButtonComponent,
        InputComponent,
    ],
})
export class SharedComponentsModule {
}
