import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceWrapperComponent } from './preference-wrapper.component';

describe('PreferenceWrapperComponent', () => {
  let component: PreferenceWrapperComponent;
  let fixture: ComponentFixture<PreferenceWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
