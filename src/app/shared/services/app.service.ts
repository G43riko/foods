import {Injectable} from "@angular/core";
import {Colors} from "../models/colors.enum";

@Injectable()
export class AppService {
    private selectedColorLocal?: Colors;
    private invertedLocal = false;
    private allowIFramesLocal = true;
    private showDistanceLocal = true;
    private showPriceLocal = true;
    private showWeightLocal = true;

    public constructor() {
        this.selectedColorLocal = Colors[localStorage.getItem("color")];
        this.invertedLocal = localStorage.getItem("inverted") === "true";
        this.allowIFramesLocal = localStorage.getItem("allowIFrames") !== "false";
        this.showDistanceLocal = localStorage.getItem("showDistance") !== "false";
        this.showPriceLocal = localStorage.getItem("showPrice") !== "false";
        this.showWeightLocal = localStorage.getItem("showWeight") !== "false";
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
    public get allowIFrames(): boolean {
        return this.allowIFramesLocal;
    }
    public set allowIFrames(value: boolean) {
        localStorage.setItem("allowIFrames", String(value));
        this.allowIFramesLocal = value;
    }
    public get showDistance(): boolean {
        return this.showDistanceLocal;
    }
    public set showDistance(value: boolean) {
        localStorage.setItem("showDistance", String(value));
        this.showDistanceLocal = value;
    }

    public get showPrice(): boolean {
        return this.showPriceLocal;
    }
    public set showPrice(value: boolean) {
        localStorage.setItem("showPrice", String(value));
        this.showPriceLocal = value;
    }

    public get showWeight(): boolean {
        return this.showWeightLocal;
    }
    public set showWeight(value: boolean) {
        localStorage.setItem("showWeight", String(value));
        this.showWeightLocal = value;
    }
    public reset(): void {
        this.selectedColor = undefined;
        this.inverted = false;
    }
}
