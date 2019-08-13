import {TestBed, inject} from "@angular/core/testing";

import {FoodsRestService} from "./foods.rest.service";
import {HttpClientModule} from "@angular/common/http";

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
