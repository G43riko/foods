import {NgModule} from "@angular/core";
import {SearchPipe} from "./search.pipe";

@NgModule({
    imports: [],
    declarations: [
        SearchPipe,
    ],
    exports: [
        SearchPipe,
    ],
})
export class SharedPipesModule {
}
