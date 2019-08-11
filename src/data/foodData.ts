const MEAT = ["kuraci", "hovadz", "bravcov", "telac", "rezen", "krkovick", "maso", "sekana", "cevapcici", "cevabcici", "klobas", "salam", "steak", "morca", "pecienka", "burger", "biftek", "slepac", "kacaci", "gulas", "fasirk", "udenin", "ragu", "prosciutto"];
const CHEESES = ["syr", "ostiep", "eidam", "encian", "emental", "hermelin", "bryndz", "masl", "tvaroh", "parmezan", "mozzarel"];
const SEA_FOOD = ["losos", "ryb", "stuka", "pstruh", "morske", "filet", "krevet", "krab", "homar", "kalmar", "sardink", "ancovick", "mecun", "tuniak", "kapor", "kaviar"];
const VEGETABLE = ["zelenin", "brokolic", "spenat", "zelenin", "hub", "hrib", "tekvic", "sampino", "uhork", "cicer", "salat", "kapust",
];
const KEYWORDS = ["specialita dna"];
const PIZZAS = ["pizza", "hawai", "prosciutto", "napoletana"];
export const FoodData = [
    {
        key: "none",
        value: "Nič",
        description: "Nič",
        visible: true,
        include: [],
        exclude: KEYWORDS,
    },
    {
        key: "meat",
        value: "Mäso",
        description: "Mäso",
        visible: true,
        include: MEAT,
        exclude: KEYWORDS,
    },
    {
        key: "pizza",
        value: "Pizza",
        description: "Pizza",
        visible: false,
        include: PIZZAS,
        exclude: KEYWORDS,
    },
    {
        key: "vegetable",
        value: "Zelenina",
        description: "Zelenina",
        visible: false,
        include: VEGETABLE,
        exclude: KEYWORDS,
    },
    {
        key: "pasta",
        value: "Cestoviny",
        description: "Cestoviny",
        visible: true,
        include: [
            "cestoviny",
            "granadier",
            "cestovin",
            "pene",
            "tortelliny",
            "spaget",
        ],
        exclude: KEYWORDS,
    },
    {
        key: "sweet",
        value: "Sladké",
        description: "Sladké",
        visible: true,
        include: [
            "dukatove",
            "rizovy",
            "sisky",
            "palacink",
            "sladk",
            "bucht",
            "zemlovka",
        ],
        exclude: KEYWORDS,
    },
    {
        key: "asia",
        value: "Ázia",
        description: "Ázia",
        visible: true,
        include: [
            "sladkokysl",
            "kungpao",
            "thajsk",
            "azijsk",
            "teriyaki",
            "sushi",
            "ramen",
            "tempura",
            "kung-pao",
        ],
        exclude: KEYWORDS,
    },
    {
        key: "vegetarian",
        value: "Vegetariánske",
        description: "Vegetariánske",
        visible: true,
        include: [""],
        exclude: [...MEAT, ...KEYWORDS],
    },
    {
        key: "vegan",
        value: "Veganske",
        description: "Veganske",
        visible: true,
        include: [""],
        exclude: [...MEAT, ...CHEESES, ...SEA_FOOD, ...KEYWORDS],
    },
    {
        key: "seafood",
        value: "Plody mora",
        description: "Plody mora",
        visible: true,
        include: SEA_FOOD,
        exclude: KEYWORDS,
    },
    {
        key: "arab",
        value: "Arabské",
        description: "Arabské",
        visible: true,
        include: ["kebab", "gyros", "pita", "arabs", "kuskus", "baklava"],
        exclude: KEYWORDS,
    },
];
export const FoodList = [
    "spagety",
    "pizza",
    "rezen",
    "steak",
    "syr",
    "salat",
    "prsia",
    "sote",
    "kare",
    "bryndz",
    "hranolky",
    "cestovin",
    "krkovicka",
    "spenat",
    "",
];
const keywords = ["menu", "ponuka", "astra", "delfin", "extra", "porcia", "with", "baby", "chicken", "cream", "vegetable", "grilled",
    "port", "soup", "fried", "homemade", "alergn", "hlavn"];
const a = document.body
                  .innerText
                  .split(/[ \n\-/]/g)
                  .filter((e) => e &&
                                        e.length > 3 &&
                                        isNaN(parseFloat(e)) &&
                                        !e.toLowerCase().match(new RegExp("(" + keywords.join("|") + ")")))
                  .map((e) => e.substr(0, e.length - 1).trim());

const res: any[] = [];
a.forEach((e) => {
    const key = e.toLowerCase();
    const found = res.find((item) => item.key === key);
    if (found) {
        found.count++;
    } else {
        res.push({key, count: 1});
    }
});
res.sort((b: any, c: any) => c.count - b.count);
