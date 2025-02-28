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


export const WRAP = [
    new Wrap('rice', "./assets/objects/Rice_Cooked.png"),
    new Wrap('nori', "./assets/objects/Nori.png"),
]

export const INGREDIENTS = [
    new Ingredient('crab', "./assets/assembly/crab.png"),
    new Ingredient('avocado', "./assets/assembly/avocado.png"),
    new Ingredient('cucmber', "./assets/assembly/cucumber.png"),
    new Ingredient('salmon', "./assets/assembly/salmon.png"),
    new Ingredient('tamago', "./assets/assembly/tamago.png"),
    new Ingredient('tuna',  "./assets/assembly/tuna.png"),
    new Ingredient('uni',  "./assets/assembly/uni.png"),

]

export const CONDIMENTS = [
    new Side('wasabi'),
    new Side('ginger')
]

export const SIDES = [
    new Side('miso soup'),
    new Side('karaage'),
    new Side('edamame'),
    new Side('takoyaki')
]
