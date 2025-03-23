import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    pizzaInfo: null
}
const modalSlice = createSlice({
    name: "pizzaModal",
    initialState: initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.pizzaInfo = action.payload;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.pizzaInfo = null
        }
    }
})
export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;