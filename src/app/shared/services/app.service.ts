import {Injectable} from "@angular/core";
import {Colors} from "../models/colors.enum";

@Injectable()
export class AppService {
    private selectedColorLocal?: Colors;
    private invertedLocal = false;

    public constructor() {
        this.selectedColorLocal = Colors[localStorage.getItem("color")];
        this.invertedLocal = localStorage.getItem("inverted") === "true";
    }

    public get selectedColor(): Colors {
        return this.selectedColorLocal;
    }

    public set selectedColor(color: Colors) {
        localStorage.setItem("color", color);
        this.selectedColorLocal = color;
    }

    public get inverted(): boolean {
        return this.invertedLocal;
    }

    public set inverted(value: boolean) {
        localStorage.setItem("inverted", String(value));
        this.invertedLocal = value;
    }

    public reset(): void {
        this.selectedColor = undefined;
        this.inverted = false;
    }
}
