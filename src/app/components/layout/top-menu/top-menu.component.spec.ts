import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../shared/modules/testing.module";
import {ProfileMenuComponent} from "../profile-menu/profile-menu.component";

import {TopMenuComponent} from "./top-menu.component";

describe("TopMenuComponent", () => {
    let component: TopMenuComponent;
    let fixture: ComponentFixture<TopMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TopMenuComponent,
                ProfileMenuComponent,
            ],
            imports: [
                TestingModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
