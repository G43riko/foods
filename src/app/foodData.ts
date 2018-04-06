export const FoodData = [
    {
        "key": "none",
        "value": "Nič",
        "items": []
    },
    {
        "key": "meat",
        "value": "Mäso",
        "items": [
            "kuraci",
            "rezen",
            "krkovicka",
            "bravcov",
            "sekana",
            "hovedz",
            "steak",
            "morca",
            "pecienka"
        ]
    },
    {
        "key": "vegetable",
        "value": "Zelenina",
        "items": [
            "zelenin",
            "brokolic",
            "spenat",
            "uhork",
            "salat",
            "kapust"
        ]
    },
    {
        "key": "pasta",
        "value": "Cestoviny",
        "items": [
            "cestoviny",
            "granadier",
            "spaget"
        ]
    },
    {
        "key": "sweet",
        "value": "Sladké",
        "items": [
            "dukatove",
            "rizovy",
            "sisky",
            "bucht",
            "zemlovka"
        ]
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
    "hranolky",
    "cestovin",
    "krkovicka",
    "spenat",
    ""
];
const keywords = ["menu", "ponuka", "astra", "delfin", "extra", "porcia", "with", "baby", "chicken", "cream", "vegetable", "grilled"];
const a = document.body
                  .innerText
                  .split(/[ \n\-/]/g)
                  .filter(e => e &&
                                        e.length > 3 &&
                                        isNaN(parseFloat(e)) &&
                                        !e.toLowerCase().match(new RegExp("(" + keywords.join("|") + ")")))
                  .map(e => e.trim());

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
