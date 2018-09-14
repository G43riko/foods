import {FoodImages} from "../../../data/foodImages";
import {StringUtils} from "./StringUtils";

export class FoodUtils {
    public static isBold(key: string): boolean {
        return key.startsWith("Polievky") ||
            key.startsWith("Hlavné") ||
            key.startsWith("Šaláty") ||
            key.startsWith("Špecialita") ||
            key.startsWith("Zeleninové ");
    }

    public static findFoodsWithImage(foodName: string): string {
        const simpleFoodName = StringUtils.toBasicForm(foodName);
        FoodImages.forEach((foodImage) => {
            // simpleFoodName.indexOf()
        });
    }
}
