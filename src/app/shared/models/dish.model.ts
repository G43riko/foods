export class Dish {
    public dish_id: string;
    public name: string;
    public weight: string;
    public price: string;

    public constructor(dish_id: string, name: string, price: string, weight?: string) {
        this.dish_id = dish_id;
        this.name = name;
        this.weight = weight;
        this.price = price;
    }
}
