import {Address} from "../services/geo-location.service";

export class Restaurant {
    public visible: boolean;
    public name: string;
    public key: string;
    public zomatoId: string;
    public googleMapsId?: string;
    public forceIFrame?: boolean;
    public menuLink?: string;
    public homepage?: string;
    public hasActualMenu?: boolean;
    public restauracieSmeLink?: string;
    public address?: Address;
}
