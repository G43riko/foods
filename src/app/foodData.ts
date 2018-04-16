const MEAT = ["kuraci", "hovadz", "bravcov", "telac", "rezen", "krkovick", "maso", "sekana", "cevapcici", "klobas", "salam",
              "steak", "morca", "pecienka", "burger", "biftek", "slepac"];

const CHEESES = ["syr", "ostiep", "eidam", "encian", "emental"];
const SEA_FOOD = ["losos", "ryba", "stuka", "pstruh", "morske", "filet", "krevet", "krab", "homar", "kalmar", "sardink",
                  "ancovick", "mecun", "tuniak", "kapor", "kaviar"];
export const FoodData = [
    {
        "key": "none",
        "value": "Nič",
        "include": [],
        "exclude": []
    },
    {
        "key": "meat",
        "value": "Mäso",
        "include": MEAT,
        "exclude": []
    },
    {
        "key": "vegetable",
        "value": "Zelenina",
        "include": [
            "zelenin",
            "brokolic",
            "spenat",
            "zelenin",
            "hub",
            "hrib",
            "tekvic",
            "sampino",
            "uhork",
            "cicer",
            "salat",
            "kapust"
        ],
        "exclude": []
    },
    {
        "key": "pasta",
        "value": "Cestoviny",
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
        "include": [""],
        "exclude": MEAT
    },
    {
        "key": "vegan",
        "value": "Veganske",
        "include": [""],
        "exclude": [...MEAT, ...CHEESES, ...SEA_FOOD]
    },
    {
        "key": "seafood",
        "value": "Plody mora",
        "include": SEA_FOOD,
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
