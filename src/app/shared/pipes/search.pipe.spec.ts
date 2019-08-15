import {Dish} from "../models/dish.model";
import {SearchFoodPipe} from "./search-food.pipe";

describe("SearchFoodPipe", () => {
    const pipe = new SearchFoodPipe();
    const defaultInput = [new Dish("005", "toto je kurací rezeň", "4.50€")];
    const changedOutput = [
        {
            dish: {
                name: `toto je <span class="searched">kurací</span> rezeň`,
                price: `4.50€`,
            },
        }];
    it("create an instance", () => {
        expect(pipe).toBeTruthy();
    });
    it("should return all", () => {
        expect(pipe.transform(null, null)).toEqual([null]);
        expect(pipe.transform([], null)).toEqual([]);
        expect(pipe.transform(defaultInput, null)).toEqual(defaultInput);
        expect(pipe.transform(defaultInput, "")).toEqual(defaultInput);
    });
    it("should change output", () => {
        // expect(pipe.transform(JSON.parse(JSON.stringify(defaultInput)), "kurací")).toEqual(changedOutput);
        expect(pipe.transform(defaultInput, "gabriel")).toEqual([null]);
        expect(pipe.transform(defaultInput, "4,50")).toEqual([null]);
    });
    xit("should change output back to default", () => {
        expect(pipe.transform(JSON.parse(JSON.stringify(changedOutput)), null)).toEqual(defaultInput);
    });
});
