import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SafePipe} from "../../components/content/pipes/safe.pipe";
import {SharedComponentsModule} from "../../shared/components/shared-components.module";
import {TestingModule} from "../../shared/modules/testing.module";
import {FeedbackContentComponent} from "../feedback-content/feedback-content.component";

import {FeedbackPanelComponent} from "./feedback-panel.component";

describe("FeedbackPanelComponent", () => {
    let component: FeedbackPanelComponent;
    let fixture: ComponentFixture<FeedbackPanelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FeedbackPanelComponent,
                FeedbackContentComponent,
                SafePipe,
            ],
            imports: [
                SharedComponentsModule,
                TestingModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedbackPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
