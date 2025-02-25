export class Order {
    
    constructor(ingredients, sides) {
        this.ingredients = ingredients
        this.sides = sides
    }
}

export default class Ingredient {
    constructor(type, img) {
        this.type = type;
        this.img = this.img;
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

export const WASABI = new Side('wasabi');
export const GINGER = new Side('ginger');
