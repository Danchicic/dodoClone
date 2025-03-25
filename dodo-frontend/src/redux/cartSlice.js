import {createSlice} from '@reduxjs/toolkit'

const getInitStateFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    if (cart) {
        return cart;

    } else {
        return {
            pizzas: [],
            cost: 0,
            productsCount: 0,
        }
    }
}
const cartSlice = createSlice({
    name: 'cart',
    initialState: getInitStateFromLocalStorage(),
    reducers: {
        pushToCart: (state, action) => {

            for (let i = 0; i < state.pizzas.length; i++) {
                // get element from exist list
                let pizzaInfo = state.pizzas[i];
                // check pizza that already exists
                if (pizzaInfo.pizza.title === action.payload.title) {
                    state.pizzas[i].count += 1
                    state.pizzas[i].cost += pizzaInfo.cost;
                    state.cost += pizzaInfo.cost;
                    state.productsCount += 1;
                    //save cart to localStorage
                    localStorage.setItem('cart', JSON.stringify(state));
                    return;
                }
            }

            state.pizzas.push(
                {
                    pizza: action.payload,
                    count: 1,
                    cost: action.payload.cost
                });
            state.productsCount += 1;
            state.cost += action.payload.cost;
            // save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(state));

        }
    }
})
export const {pushToCart} = cartSlice.actions;
export default cartSlice.reducer;