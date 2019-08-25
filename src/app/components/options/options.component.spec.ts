import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../shared/modules/testing.module";
import {OptionCheckboxComponent} from "./option-checkbox/option-checkbox.component";

import {OptionsComponent} from "./options.component";

describe("OptionsComponent", () => {
    let component: OptionsComponent;
    let fixture: ComponentFixture<OptionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                OptionsComponent,
                OptionCheckboxComponent,
            ],
            imports: [
                TestingModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OptionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
