import {Component, HostListener, Input, OnInit} from "@angular/core";
import {ControlValueAccessor} from "@angular/forms";

@Component({
    selector: "fds-selectbox",
    templateUrl: "./selectbox.component.html",
    styleUrls: ["./selectbox.component.scss"],
})
export class SelectboxComponent<T = any> implements OnInit, ControlValueAccessor {
    @Input() public values: T[] = [];
    @Input() public placeholder: string;
    @Input() public label: string = "Some selectbox label";
    public value: T;
    public focusIndex = 0;

    public opened = false;

    public constructor() {
    }

    public get visibleValue(): string {
        if (this.value) {
            return String(this.value);
        }
        if (this.placeholder) {
            return this.placeholder;
        }
        if (Array.isArray(this.values) && this.values.length) {
            return String(this.values[0]);
        }

        return "";
    }


    @HostListener("keydown", ["$event"])
    public onKeyDown(event: KeyboardEvent): boolean {
        if (!this.opened) {
            this.open();

            return false;
        }
        console.log(event.code, this.focusIndex, this.opened);
        if (event.code === "ArrowDown") {
            this.focusIndex++;
        } else if (event.code === "ArrowUp") {
            this.focusIndex--;
        } else if (event.code === "Enter") {
            this.setValue(this.values[this.focusIndex]);
            this.close();

            return false;
        }
        this.focusIndex = Math.min(Math.max(0, this.focusIndex), this.values.length - 1);

        return false;
    }

    @HostListener("document:keydown.escape")
    public close(): void {
        this.opened = false;
    }

    public open(): void {
        this.opened = true;
    }
    public toggle(): void {
        this.opened ? this.close() : this.open();
    }

    public setValue(newValue: T): void {
        this.value = newValue;
        this.focusIndex = this.values.indexOf(newValue);
        this.onChange(newValue);
    }

    public onChange(value: T): void {
        // empty
    }

    public onTouched(value: T): void {
        // empty
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public writeValue(obj: T): void {
        this.value = obj;
    }

    public ngOnInit(): void {
    }

}
