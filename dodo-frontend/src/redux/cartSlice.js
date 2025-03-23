import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    pizzas: [],
    isOpen: false,
    cost: 0,
    productsCount: 0,
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        openCart: (state) => {
            state.isOpen = true;
        },
        closeCart: (state) => {
            state.isOpen = false;
        },
        pushToCart: (state, action) => {
            for (let i = 0; i < state.pizzas.length; i++) {
                // get element from exist list
                let pizzaInfo = state.pizzas[i];
                // check pizza that already exists
                if (pizzaInfo.pizza.title === action.payload.shortPizzaInfo.title) {
                    state.pizzas[i].count += 1
                    state.pizzas[i].cost += pizzaInfo.cost;
                    return;
                }
            }

            state.pizzas.push(
                {
                    pizza: action.payload.shortPizzaInfo,
                    count: 1,
                    cost: action.payload.pizzaCost
                });
            state.productsCount += 1;
            state.cost += action.payload.pizzaCost;
        }
    }
})
export const {openCart, closeCart, pushToCart} = cartSlice.actions;
export default cartSlice.reducer;