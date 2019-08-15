import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {SharedPipesModule} from "./pipes/shared-pipes.module";

@NgModule({
    imports: [
        CommonModule,
        SharedPipesModule,
    ],
    exports: [
        CommonModule,
        SharedPipesModule,
    ],
    declarations: [],
})
export class SharedModule {
}
