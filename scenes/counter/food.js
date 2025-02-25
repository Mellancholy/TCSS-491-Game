export class Order {
    
    constructor(ingredients, side, condiment) {
        this.ingredients = ingredients;
        this.side = side;
        this.condiment = condiment;
    }
}

export default class Ingredient {
    constructor(type) {
        this.type = type
    }
}

class Wrap extends Ingredient {
    constructor(type) {
        super(type);
    }
}

class Side {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

class Condiment {
    constructor(type) {
        this.type = type
    }
}

// rolls
export const CALIFORNIA_ROLL = [
    new Ingredient('rice'),
    new Wrap('nori'),
    new Ingredient('crab'),
    new Ingredient('avocado')
]

export const SPICY_TUNA_ROLL = [
    new Ingredient('rice'),
    new Wrap('nori'),
    new Ingredient('tuna'),
    new Ingredient('mayo')
]

export const ALASKAN_ROLL = [
    new Ingredient('salmon'),
    new Ingredient('rice'),
    new Wrap('nori'),
    new Ingredient('avocado'),
    new Ingredient('crab')
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

// condiments
export const WASABI = new Condiment('wasabi');
export const GINGER = new Condiment('ginger');
export const SOY = new Condiment('soy sauce');
