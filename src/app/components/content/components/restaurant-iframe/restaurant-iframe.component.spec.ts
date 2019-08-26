import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantIframeComponent } from './restaurant-iframe.component';

describe('RestaurantIframeComponent', () => {
  let component: RestaurantIframeComponent;
  let fixture: ComponentFixture<RestaurantIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
