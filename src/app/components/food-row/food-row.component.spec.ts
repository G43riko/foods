import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodRowComponent } from './food-row.component';

describe('FoodRowComponent', () => {
  let component: FoodRowComponent;
  let fixture: ComponentFixture<FoodRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
