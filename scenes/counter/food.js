export class Order {
    
    constructor(ingredients, sides) {
        this.ingredients = ingredients
        this.sides = sides
    }
}

export default class Ingredient {
    constructor(type, img) {
        this.type = type;
        this.img = img;
    }
}

class Wrap extends Ingredient {
    constructor(type, img) {
        super(type, img);
    }
}

class Side {
    constructor(type) {
        this.type = type
    }
}

export const CALIFORNIA_ROLL = [
    new Ingredient('rice'),
    new Wrap('nori'),
    new Ingredient('crab', "./assets/assembly/crab.png"),
    new Ingredient('avocado', "./assets/assembly/avocado.png"),
]

export const SPICY_TUNA_ROLL = [
    new Ingredient('rice'),
    new Wrap('nori'),
    new Ingredient('tuna', "./assets/assembly/tuna.png"),
]

export const ALASKAN_ROLL = [
    new Ingredient('salmon, "./assets/assembly/salmon.png"'),
    new Ingredient('rice'),
    new Wrap('nori'),
    new Ingredient('avocado', "./assets/assembly/avocado.png"),
    new Ingredient('crab', "./assets/assembly/crab.png"),
]

export const WASABI = new Side('wasabi');
export const GINGER = new Side('ginger');
