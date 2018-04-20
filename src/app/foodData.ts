const MEAT = ["kuraci", "hovadz", "bravcov", "telac", "rezen", "krkovick", "maso", "sekana", "cevapcici", "klobas", "salam", "steak", "morca", "pecienka", "burger", "biftek", "slepac", "kacaci", "gulas"];
const CHEESES = ["syr", "ostiep", "eidam", "encian", "emental", "hermelin", "bryndz", "masl", "tvaroh", "parmezan"];
const SEA_FOOD = ["losos", "ryba", "stuka", "pstruh", "morske", "filet", "krevet", "krab", "homar", "kalmar", "sardink", "ancovick", "mecun", "tuniak", "kapor", "kaviar"];
const VEGETABLE = ["zelenin", "brokolic", "spenat", "zelenin", "hub", "hrib", "tekvic", "sampino", "uhork", "cicer", "salat", "kapust"
];
export const FoodData = [
    {
        "key": "none",
        "value": "Nič",
        "visible": true,
        "include": [],
        "exclude": []
    },
    {
        "key": "meat",
        "value": "Mäso",
        "visible": true,
        "include": MEAT,
        "exclude": []
    },
    {
        "key": "vegetable",
        "value": "Zelenina",
        "visible": false,
        "include": VEGETABLE,
        "exclude": []
    },
    {
        "key": "pasta",
        "value": "Cestoviny",
        "visible": true,
        "include": [
            "cestoviny",
            "granadier",
            "cestovin",
            "pene",
            "tortelliny",
            "spaget"
        ],
        "exclude": []
    },
    {
        "key": "sweet",
        "value": "Sladké",
        "visible": true,
        "include": [
            "dukatove",
            "rizovy",
            "sisky",
            "palacink",
            "sladk",
            "bucht",
            "zemlovka"
        ],
        "exclude": []
    },
    {
        "key": "asia",
        "value": "Ázia",
        "visible": true,
        "include": [
            "sladkokysl",
            "kungpao",
            "thajsk",
            "azijsk",
            "teriyaki",
            "sushi",
            "ramen",
            "tempura",
            "kung-pao"
        ],
        "exclude": []
    },
    {
        "key": "vegetarian",
        "value": "Vegetariánske",
        "visible": true,
        "include": [""],
        "exclude": MEAT
    },
    {
        "key": "vegan",
        "value": "Veganske",
        "visible": true,
        "include": [""],
        "exclude": [...MEAT, ...CHEESES, ...SEA_FOOD]
    },
    {
        "key": "seafood",
        "value": "Plody mora",
        "visible": true,
        "include": SEA_FOOD,
        "exclude": []
    },
    {
        "key": "arab",
        "value": "Arabské",
        "visible": true,
        "include": ["kebab", "gyros", "pita", "arabs", "kuskus", "baklava"],
        "exclude": []
    }
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
    ""
];
const keywords = ["menu", "ponuka", "astra", "delfin", "extra", "porcia", "with", "baby", "chicken", "cream", "vegetable", "grilled",
    "port", "soup", "fried", "homemade", "alergn", "hlavn"];
const a = document.body
                  .innerText
                  .split(/[ \n\-/]/g)
                  .filter(e => e &&
                                        e.length > 3 &&
                                        isNaN(parseFloat(e)) &&
                                        !e.toLowerCase().match(new RegExp("(" + keywords.join("|") + ")")))
                  .map(e => e.substr(0, e.length - 1).trim());

const res = [];
a.forEach(e => {
    const key = e.toLowerCase();
    const found = res.find((item) => item.key === key);
    if (found) {
        found.count++;
    } else {
        res.push({key, count: 1});
    }
});
res.sort((b, c) => c.count - b.count);
