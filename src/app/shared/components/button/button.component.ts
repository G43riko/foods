import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: "fds-button",
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        "[style.display]": "inline ? 'inline-block' : 'block'",
    },
})
export class ButtonComponent implements OnInit {
    @Output() public readonly click = new EventEmitter<void>();
    @Input() public value: string;
    @Input() public icon: string;
    @Input() public inline: boolean;
    @Input() public fullWidth: boolean;
    @Input() public loading: boolean;

    public ngOnInit(): void {
        // empty
    }

    public onClick(): void {
        this.click.emit();
    }
}
