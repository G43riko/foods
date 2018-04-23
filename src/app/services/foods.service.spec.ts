import {TestBed, inject} from "@angular/core/testing";

import {FoodsService} from "./foods.service";
import {HttpClientModule} from "@angular/common/http";

describe("FoodService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FoodsService],
            imports: [HttpClientModule]
        });
    });

    it("should be created", inject([FoodsService], (service: FoodsService) => {
        expect(service).toBeTruthy();
    }));
});
