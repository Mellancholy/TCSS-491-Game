import GameObject from "./gameObject";
import Customer from "./scenes/counter/customer";
import { Order } from "./scenes/counter/food";

type OrderState = {
    customer: Customer
    order: Order
}
type GameStateType = {
    money: number
    gameTime: number;
    timeSinceDayStart: number;
    orders: OrderState[]
    orderWorkingOn: Order | null
    currentDraggedItem: GameObject | null
};

const DEFAULT_GAME_STATE: GameStateType = {
    money: 0,
    gameTime: 0,
    timeSinceDayStart: 0,
    orders: [],
    orderWorkingOn: null,
    currentDraggedItem: null
};

export default class GameState {
    private static instance: GameState;
    private state: GameStateType = { ...DEFAULT_GAME_STATE };
    
    private constructor() {}
    
    public static getInstance(): GameState {
        if (!GameState.instance) {
            GameState.instance = new GameState();
        }
        return GameState.instance;
    }
    
    public setState<K extends keyof GameStateType>(key: K, value: GameStateType[K]): GameStateType[K] {
        this.state[key] = value;
        return this.state[key];
    }
    
    public getState<K extends keyof GameStateType>(key: K): GameStateType[K] {
        return this.state[key];
    }

    public getAndMofifyState<K extends keyof GameStateType>(key: K, modifier: (value: GameStateType[K]) => GameStateType[K]): GameStateType[K] {
        const currentValue = this.state[key];
        const newValue = modifier(currentValue);
        this.state[key] = newValue;
        return newValue;
    }

    public addOrder(customer: Customer, order: Order): void {
        this.state.orders.push({ customer, order });
    }

    public completeOrder(order: Order): void {
        this.state.orders = this.state.orders.filter(o => o.order !== order);
    }
}