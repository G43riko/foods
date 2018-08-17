export class Dish {
    public dish_id: string;
    public name: string;
    public price: string;

    public constructor(dish_id: string, name: string, price: string) {
        this.dish_id = dish_id;
        this.name = name;
        this.price = price;
    }
}
