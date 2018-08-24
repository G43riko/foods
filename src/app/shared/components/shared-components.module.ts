import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {SideNavComponent} from "./side-nav/side-nav.component";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SideNavComponent,
    ],
    exports: [
        SideNavComponent,
    ],
})

export class SharedComponentsModule {
}
