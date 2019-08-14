import {inject, TestBed} from "@angular/core/testing";

import {HttpClientModule} from "@angular/common/http";
import {FoodsExternalService} from "./foods-external.service";

describe("FoodService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FoodsExternalService],
            imports: [HttpClientModule],
        });
    });

    it("should be created", inject([FoodsExternalService], (service: FoodsExternalService) => {
        expect(service).toBeTruthy();
    }));
});
