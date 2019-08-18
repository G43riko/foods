import {TestBed} from "@angular/core/testing";

import {TranslateMockService} from "./translate-mock.service";

describe("TranslateServiceMockService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: TranslateMockService = TestBed.get(TranslateMockService);
        expect(service).toBeTruthy();
    });
});
