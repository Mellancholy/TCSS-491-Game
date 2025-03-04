export class Order {
    ingredients: Ingredient[];
    sides: Side[];
    condiment: Condiment | null;
    
    constructor(ingredients: Ingredient[], sides: Side[], condiment: Condiment | null) {
        this.ingredients = ingredients;
        this.sides = sides;
        this.condiment = condiment;
    }
}

export default class Ingredient {
    name: string;
    img: string;

    constructor(type: string, img: string = '') {
        this.name = type
        this.img = img
    }
}

class Side {
    name: string;
    type: Ingredient[];
    
    constructor(name: string, type: Ingredient[]) {
        this.name = name;
        this.type = type;
    }
}

class Condiment {
    type: string;

    constructor(type: string) {
        this.type = type
    }
}

export const NORI = new Ingredient('nori', './assets/objects/Nori.png');
export const RICE = new Ingredient('rice', './assets/objects/Rice.png');
export const RICE_CARRY = './assets/objects/Rice_Cooked.png';

const AVOCADO = new Ingredient('avocado', './assets/assembly/avocado.png');
const CRAB = new Ingredient('crab', './assets/assembly/crab.png');
const CUCUMBER = new Ingredient('cucumber', './assets/assembly/cucumber.png');
const OCTOPUS = new Ingredient('octopus', './assets/assembly/octopus.png');
const SALMON = new Ingredient('salmon', './assets/assembly/salmon.png');
const TUNA = new Ingredient('tuna', './assets/assembly/tuna.png');
const UNI = new Ingredient('uni', './assets/assembly/uni.png');
const TAMAGO = new Ingredient('tamago', './assets/assembly/tamago.png');

export const WRAP = [
    NORI, RICE
]

export const FILLINGS = [
    AVOCADO, CRAB, CUCUMBER, OCTOPUS, SALMON, TUNA, UNI, TAMAGO
]


// rolls
export const CALIFORNIA_ROLL = [
    RICE,
    NORI,
    CRAB,
    AVOCADO
]

export const SPICY_TUNA_ROLL = [
    RICE,
    NORI,
    TUNA,
]

export const ALASKAN_ROLL = [
    SALMON,
    RICE,
    NORI,
    AVOCADO,
    CRAB,
]

// sides
export const KARAAGE = new Side('karaage', [
    new Ingredient('chicken')
]);

export const MISOSOUP = new Side('miso soup', [
    new Ingredient('miso'),
    new Ingredient('green onion'),
    new Ingredient('tofu')
]);

export const EDAMAME = new Side('edamame', [
    new Ingredient('edamame')
]);

export const GYOZA = new Side('gyoza', [
    new Ingredient('chicken'),
    new Ingredient('green onions')
]);

export const SIDES = [
    KARAAGE,
    MISOSOUP,
    EDAMAME,
    GYOZA
]

// condiments
export const WASABI = new Condiment('wasabi');
export const GINGER = new Condiment('ginger');
export const SOY = new Condiment('soy sauce');

export const CONDIMENTS = [
    WASABI,
    GINGER,
    SOY
]