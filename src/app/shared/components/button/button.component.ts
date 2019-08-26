import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: "fds-button",
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
    @Output() public readonly click = new EventEmitter<void>();
    @Input() public value: string;
    @Input() public icon: string;
    @Input() public loading: boolean;

    public ngOnInit(): void {
    }

    public onClick(): void {
        this.click.emit();
    }
}
