import {Coord} from "../services/geo-location.service";

export class Restaurant {
    public visible: boolean;
    public name: string;
    public key: string;
    public id: string;
    public mapsId?: string;
    public forceIFrame?: boolean;
    public menuLink?: string;
    public homepage?: string;
    public hasActualMenu?: boolean;
    public smeRestaurantsLink?: string;
    public coordinates?: Coord;
}
