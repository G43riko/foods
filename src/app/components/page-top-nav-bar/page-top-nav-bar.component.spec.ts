import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../shared/modules/testing/testing.module";

import {PageTopNavBarComponent} from "./page-top-nav-bar.component";
import {FormsModule} from "@angular/forms";

describe("PageTopNavBarComponent", () => {
    let component: PageTopNavBarComponent;
    let fixture: ComponentFixture<PageTopNavBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageTopNavBarComponent],
            imports: [
                TestingModule,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageTopNavBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
