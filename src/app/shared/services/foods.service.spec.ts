import {HttpClientModule} from "@angular/common/http";
import {inject, TestBed} from "@angular/core/testing";
import {FirebaseModule} from "../modules/firebase.module";
import {TestingModule} from "../modules/testing.module";
import {FoodsExternalService} from "./foods-external.service";

describe("FoodService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FoodsExternalService],
            imports: [
                TestingModule,
                HttpClientModule,
                FirebaseModule,
            ],
        });
    });

    it("should be created", inject([FoodsExternalService], (service: FoodsExternalService) => {
        expect(service).toBeTruthy();
    }));
});
