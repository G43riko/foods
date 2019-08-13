import { TestBed } from "@angular/core/testing";
import {TestingModule} from "../modules/testing/testing.module";

import { RatingService } from "./rating.service";

describe("RatingServiceService", () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [
        TestingModule,
    ]}));

  it("should be created", () => {
    const service: RatingService = TestBed.get(RatingService);
    expect(service).toBeTruthy();
  });
});
