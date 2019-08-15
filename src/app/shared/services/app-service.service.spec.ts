import {inject, TestBed} from "@angular/core/testing";
import {TestingModule} from "../modules/testing.module";

import {AppService} from "./app.service";

describe("AppService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
            ],
        });
    });

    it("should be created", inject([AppService], (service: AppService) => {
        expect(service).toBeTruthy();
    }));
});
