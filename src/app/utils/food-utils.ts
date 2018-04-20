export class FoodUtils {
    public static isBold(key: string): boolean {
        return key.startsWith("Polievky") ||
               key.startsWith("Hlavné") ||
               key.startsWith("Špeciálita") ||
               key.startsWith("Zeleninové ");
    }
}
