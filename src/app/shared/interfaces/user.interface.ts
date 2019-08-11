import {AppConfiguration} from "../services/app.service";

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    config?: AppConfiguration;
}
