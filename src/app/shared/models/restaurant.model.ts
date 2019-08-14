import {Coord} from "../services/geo-location.service";

export class Restaurant {
    public visible: boolean;
    public name: string;
    public key: string;
    public id: string;
    public mapsId?: string;
    public menuLink?: string;
    public hasActualMenu?: boolean;
    public coordinates?: Coord;
}
