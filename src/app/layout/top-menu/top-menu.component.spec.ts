import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SharedComponentsModule} from "../../shared/components/shared-components.module";
import {TestingModule} from "../../shared/modules/testing.module";
import {FeedbackContentComponent} from "../feedback-content/feedback-content.component";
import {FeedbackPanelComponent} from "../feedback-panel/feedback-panel.component";
import {ProfileMenuComponent} from "../profile-menu/profile-menu.component";

import {TopMenuComponent} from "./top-menu.component";

describe("TopMenuComponent", () => {
    let component: TopMenuComponent;
    let fixture: ComponentFixture<TopMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TopMenuComponent,
                FeedbackPanelComponent,
                FeedbackContentComponent,
                ProfileMenuComponent,
            ],
            imports: [
                TestingModule,
                SharedComponentsModule,
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
