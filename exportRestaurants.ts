import * as fs from "fs";
import {RestaurantData} from "./src/data/restaurantsData";

fs.writeFileSync("restRes.json", RestaurantData.map((restaurant) => ({
    googleMapsId: restaurant.googleMapsId,
    zomatoId: restaurant.zomatoId,
    restauracieSmeLink: `https://restauracie.sme.sk/restauracia${restaurant.restauracieSmeLink}`,
    key: restaurant.key,
    menuLink: restaurant.menuLink,
    homepage: restaurant.homepage,
    _id: "",
    zomatoName: restaurant.name,
    address: restaurant.address ? {
        latitude: restaurant.address.latitude,
        longitude: restaurant.address.longitude,
    } : undefined,
    visible: restaurant.visible,
})));
