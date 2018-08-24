import {Injectable} from "@angular/core";

type colors = "red" | "orange" | "yellow" | "olive" | "green" | "teal" | "blue" | "violet" | "purple" | "pink" | "brown" | "grey";

@Injectable()
export class AppService {
    public selectedColor?: colors = "red";
    public inverted = false;
}
