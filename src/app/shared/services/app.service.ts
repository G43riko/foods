import {Injectable} from "@angular/core";
import {Colors} from "../models/colors.enum";

@Injectable()
export class AppService {
    public selectedColorLocal?: Colors = Colors.red;

    public constructor() {
        this.selectedColorLocal = Colors[localStorage.getItem("color")];
    }

    public get selectedColor(): Colors {
        return this.selectedColorLocal;
    }

    public set selectedColor(color: Colors) {
        localStorage.setItem("color", color);
        this.selectedColorLocal = color;
    }

    public inverted = false;
}
