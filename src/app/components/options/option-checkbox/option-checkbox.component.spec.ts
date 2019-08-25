import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OptionCheckboxComponent } from "./option-checkbox.component";

describe("OptionCheckboxComponent", () => {
  let component: OptionCheckboxComponent;
  let fixture: ComponentFixture<OptionCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionCheckboxComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
