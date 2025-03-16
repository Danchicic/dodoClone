import {configureStore} from "@reduxjs/toolkit"
import regionReducer from "./regionSlice.js"

const store = configureStore({
    reducer: {
        region: regionReducer,
    }
})
export default store;