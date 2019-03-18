export class Config {
    public static readonly ZOMATO_API_KEY = "cbc11fdb6cb6e160bc12508dcb57b405";
    // public static readonly ZOMATO_API_KEY = "e9e845908aebec0e95fc72310a1a3b59";

/*
    public static readonly WEIGHT_REGEXP = /\d+(,|.)?\d+ ?[gl][ \/]?/g;
    public static readonly PRICE_REGEXP = /\d+(,|.)\d+ ?(,|.)-/g;
*/
    public static readonly WEIGHT_REGEXP = /\d+[,.]?\d+ ?[gl][ \/]?/g;
    public static readonly PRICE_REGEXP = /[0-9]+[,.][0-9]+ ?[,.]-/g;

    public static readonly REGEXP = /\/?(\d+[,./])*\d+[/,.]?/g;

    public static readonly DAYS = ["pondelok", "utorok", "streda", "štvrtok", "piatok"];

    public static readonly ZOMATO_API_URL = "https://developers.zomato.com/api/v2.1/dailymenu";
    public static readonly PRESTO_URL = "http://www.restaurantpresto.sk/sk/menu/presto-bbc-i";
}
