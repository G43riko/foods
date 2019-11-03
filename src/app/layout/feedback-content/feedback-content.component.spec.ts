import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SharedComponentsModule} from "../../shared/components/shared-components.module";
import {TestingModule} from "../../shared/modules/testing.module";

import {FeedbackContentComponent} from "./feedback-content.component";

describe("FeedbackContentComponent", () => {
    let component: FeedbackContentComponent;
    let fixture: ComponentFixture<FeedbackContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FeedbackContentComponent,
            ],
            imports: [
                SharedComponentsModule,
                TestingModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedbackContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
