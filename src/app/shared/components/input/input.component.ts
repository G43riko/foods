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
    @Input() public placeholder: string;
    @Input() public label: string;
    @Input() public fullWidth: boolean;

    public iconWidth = 30;
    @Input() public icon: string;
    @Input() public iconAlign: "left" | "right" = "left";
    public id = "input-" + InputComponent.idCounter++;
    @Input()
    public set disabled(isDisabled: boolean) {
        this.inputElement.nativeElement.disabled = isDisabled;
    }

    public constructor() {
    }

    public ngOnInit(): void {
    }

    public onChange(value: any): void {
    }

    public onTouched(value: any): void {
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
        if (!obj) {
            obj = "";
        }
        this.inputElement.nativeElement.value = obj;
    }
}
