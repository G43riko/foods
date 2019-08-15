import {TestBed} from "@angular/core/testing";
import {TestingModule} from "../modules/testing.module";

import {AuthService} from "./auth.service";

describe("AuthServiceService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            TestingModule,
        ],
    }));

    it("should be created", () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });
});
