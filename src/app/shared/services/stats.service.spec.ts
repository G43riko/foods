import {HttpClientModule} from "@angular/common/http";
import {inject, TestBed} from "@angular/core/testing";
import {StatsService} from "./stats.service";

describe("StatService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StatsService],
            imports: [HttpClientModule],
        });
    });

    it("should be created", inject([StatsService], (service: StatsService) => {
        expect(service).toBeTruthy();
    }));
});
