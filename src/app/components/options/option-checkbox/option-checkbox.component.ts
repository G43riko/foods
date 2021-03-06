import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {AppConfiguration, AppService} from "../../../shared/services/app.service";

@Component({
    selector: "fds-option-checkbox",
    templateUrl: "./option-checkbox.component.html",
    styleUrls: ["./option-checkbox.component.scss"],
    host: {
        style: "padding: .3em",
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionCheckboxComponent implements OnInit {
    @Input() public key: keyof AppConfiguration;

    public constructor(public readonly appService: AppService) {
    }

    public ngOnInit(): void {
        // empty
    }

}
