import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTesterComponent } from './menu-tester.component';

describe('MenuTesterComponent', () => {
  let component: MenuTesterComponent;
  let fixture: ComponentFixture<MenuTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
