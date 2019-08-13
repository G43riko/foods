import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {TestingModule} from "../../shared/modules/testing/testing.module";

import { FoodRowLikesComponent } from "./food-row-likes.component";

describe("FoodRowLikesComponent", () => {
  let component: FoodRowLikesComponent;
  let fixture: ComponentFixture<FoodRowLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodRowLikesComponent ],
        imports: [
          TestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodRowLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
