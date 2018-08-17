import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgModule, Optional, SkipSelf} from "@angular/core";
import {AppService} from "./app.service";
import {FoodsRestService} from "./foods.rest.service";
import {FoodsService} from "./foods.service";
import {ParserService} from "./parser.service";
import {StatsService} from "./stats.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        FoodsRestService,
        ParserService,
        StatsService,
        AppService,
        FoodsService,
    ],
    declarations: [],
})
export class CoreModule {
    public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error("CoreModule is already loaded. Import only in AppModule");
        }
    }
}
