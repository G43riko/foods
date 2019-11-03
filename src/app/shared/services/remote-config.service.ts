import {Injectable} from "@angular/core";
import {remoteConfig} from "firebase";

@Injectable({
    providedIn: "root",
})
export class RemoteConfigService {
    private readonly config = remoteConfig();

    public constructor() {
        this.config.settings = {
            fetchTimeoutMillis: 3600000,
            minimumFetchIntervalMillis: 3600000,
        };
        this.config.defaultConfig = {
            allow_highlight_menu: true,
        };

        this.config.fetchAndActivate().catch((err) => {
            console.error(err);
        });
    }

    public get allowHighlightMenu(): boolean {
        return this.config.getBoolean("allow_highlight_menu");
    }
}
