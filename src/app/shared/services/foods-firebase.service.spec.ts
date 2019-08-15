import {TestBed} from "@angular/core/testing";
import {FirebaseModule} from "../modules/firebase.module";
import {TestingModule} from "../modules/testing.module";

import {FoodsFirebaseService} from "./foods-firebase.service";

describe("FoodsFirebaseService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            TestingModule,
            FirebaseModule,
        ],
    }));

    it("should be created", () => {
        const service: FoodsFirebaseService = TestBed.get(FoodsFirebaseService);
        expect(service).toBeTruthy();
    });
});
