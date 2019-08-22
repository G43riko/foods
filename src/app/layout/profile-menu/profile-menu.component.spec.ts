import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../shared/modules/testing.module";

import {ProfileMenuComponent} from "./profile-menu.component";

describe("ProfileMenuComponent", () => {
    let component: ProfileMenuComponent;
    let fixture: ComponentFixture<ProfileMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileMenuComponent],
            imports: [
                TestingModule,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
