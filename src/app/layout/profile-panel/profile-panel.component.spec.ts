import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TranslateModule} from "@ngx-translate/core";
import {SharedComponentsModule} from "../../shared/components/shared-components.module";
import {FirebaseModule} from "../../shared/modules/firebase.module";
import {TestingModule} from "../../shared/modules/testing.module";

import {ProfilePanelComponent} from "./profile-panel.component";

describe("ProfilePanelComponent", () => {
    let component: ProfilePanelComponent;
    let fixture: ComponentFixture<ProfilePanelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProfilePanelComponent,
            ],
            imports: [
                SharedComponentsModule,
                FirebaseModule,
                TestingModule,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfilePanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
