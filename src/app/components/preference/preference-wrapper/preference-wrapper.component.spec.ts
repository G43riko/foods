import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../shared/modules/testing.module";
import {HighlightSelectorComponent} from "../highlight-selector/highlight-selector.component";

import {PreferenceWrapperComponent} from "./preference-wrapper.component";

describe("PreferenceWrapperComponent", () => {
    let component: PreferenceWrapperComponent;
    let fixture: ComponentFixture<PreferenceWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PreferenceWrapperComponent,
                HighlightSelectorComponent,
            ],
            imports: [
                TestingModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PreferenceWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
