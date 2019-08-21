import * as fs from "fs";
import {RestaurantData} from "./src/data/restaurantsData";

fs.writeFileSync("restRes.json", RestaurantData.map((restaurant) => ({
    googleMapsId: restaurant.mapsId,
    zomatoId: restaurant.id,
    restauracieSmeLink: `https://restauracie.sme.sk/restauracia${restaurant.smeRestaurantsLink}`,
    key: restaurant.key,
    menuLink: restaurant.menuLink,
    homepage: restaurant.homepage,
    _id: "",
    zomatoName: restaurant.name,
    address: restaurant.coordinates ? {
        latitude: restaurant.coordinates.lat,
        longitude: restaurant.coordinates.long,
    } : undefined,
    visible: restaurant.visible,
})));
