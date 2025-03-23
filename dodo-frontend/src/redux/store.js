import {configureStore} from "@reduxjs/toolkit"
import regionReducer from "./regionSlice.js"
import pizzaModalSlice from "./pizzaModalSlice.js";
import cartSlice from "./cartSlice.js";

const store = configureStore({
    reducer: {
        region: regionReducer,
        modal: pizzaModalSlice,
        cart: cartSlice
    }
})
export default store;