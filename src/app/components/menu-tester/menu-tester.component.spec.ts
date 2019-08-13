import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {MenuContainerComponent} from "../menu-containter/menu-container.component";
import {MenuContentComponent} from "../menu-content/menu-content.component";
import {MenuDrawerComponent} from "../menu-drawer/menu-drawer.component";

import { MenuTesterComponent } from "./menu-tester.component";

describe("MenuTesterComponent", () => {
  let component: MenuTesterComponent;
  let fixture: ComponentFixture<MenuTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          MenuTesterComponent,
          MenuDrawerComponent,
          MenuContainerComponent,
          MenuContentComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
