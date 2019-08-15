import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../../shared/modules/testing.module";

import {HighlightSelectorComponent} from "./highlight-selector.component";

describe("HighlightSelectorComponent", () => {
    let component: HighlightSelectorComponent;
    let fixture: ComponentFixture<HighlightSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HighlightSelectorComponent,
            ],
            imports: [
                TestingModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HighlightSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
