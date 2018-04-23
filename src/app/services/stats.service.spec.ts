import {TestBed, inject} from "@angular/core/testing";

import {StatsService} from "./stats.service";
import {HttpClientModule} from "@angular/common/http";

describe("StatService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StatsService],
            imports: [HttpClientModule]
        });
    });

    it("should be created", inject([StatsService], (service: StatsService) => {
        expect(service).toBeTruthy();
    }));
});
