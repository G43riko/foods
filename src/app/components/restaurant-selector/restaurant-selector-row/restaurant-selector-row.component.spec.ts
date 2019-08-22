import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSelectorRowComponent } from './restaurant-selector-row.component';

describe('RestaurantSelectorRowComponent', () => {
  let component: RestaurantSelectorRowComponent;
  let fixture: ComponentFixture<RestaurantSelectorRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantSelectorRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantSelectorRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
