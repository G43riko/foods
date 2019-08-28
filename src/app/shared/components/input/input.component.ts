import {ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: "fds-input",
    templateUrl: "./input.component.html",
    styleUrls: ["./input.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        style: "position: relative;",
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
    private static idCounter = 1;
    @ViewChild("inputElement", {static: true}) private readonly inputElement: ElementRef<HTMLInputElement>;

    public id = "fds-input-" + InputComponent.idCounter++;
    public iconWidth = 30;

    @Input() public placeholder: string;
    @Input() public label: string;
    @Input() public fullWidth: boolean;
    @Input() public icon: string;
    @Input() public iconAlign: "left" | "right" = "left";

    @Input()
    public set disabled(isDisabled: boolean) {
        this.inputElement.nativeElement.disabled = isDisabled;
    }
    public ngOnInit(): void {
        // empty
    }

    public onChange(value: any): void {
        // empty
    }

    public onTouched(value: any): void {
        // empty
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.inputElement.nativeElement.disabled = isDisabled;
    }

    public writeValue(obj: any): void {
        this.inputElement.nativeElement.value = obj || "";
    }
}
