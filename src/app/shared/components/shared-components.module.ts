import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "./button/button.component";
import {InputComponent} from "./input/input.component";
import { SelectboxComponent } from './selectbox/selectbox.component';

@NgModule({
    declarations: [
        ButtonComponent,
        InputComponent,
        SelectboxComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
    ],
    exports: [
        ReactiveFormsModule,
        ButtonComponent,
        InputComponent,
        SelectboxComponent,
    ],
})
export class SharedComponentsModule {
}
