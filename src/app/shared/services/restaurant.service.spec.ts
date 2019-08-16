import {TestBed} from "@angular/core/testing";
import {FirebaseModule} from "../modules/firebase.module";
import {TestingModule} from "../modules/testing.module";

import {RestaurantService} from "./restaurant.service";

describe("RestaurantService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            FirebaseModule,
            TestingModule,
        ],
    }));

    it("should be created", () => {
        const service: RestaurantService = TestBed.get(RestaurantService);
        expect(service).toBeTruthy();
    });
});
