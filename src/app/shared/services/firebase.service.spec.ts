import {TestBed} from "@angular/core/testing";
import {FirebaseModule} from "../modules/firebase.module";

import {FirebaseService} from "./firebase.service";

describe("FirebaseService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            FirebaseModule,
        ],
    }));

    it("should be created", () => {
        const service: FirebaseService = TestBed.get(FirebaseService);
        expect(service).toBeTruthy();
    });
});
