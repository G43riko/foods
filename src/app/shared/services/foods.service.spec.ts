import {inject, TestBed} from "@angular/core/testing";

import {HttpClientModule} from "@angular/common/http";
import {FoodsRestService} from "./foods.rest.service";

describe("FoodService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FoodsRestService],
            imports: [HttpClientModule],
        });
    });

    it("should be created", inject([FoodsRestService], (service: FoodsRestService) => {
        expect(service).toBeTruthy();
    }));
});
