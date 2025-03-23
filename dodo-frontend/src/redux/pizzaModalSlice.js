import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    pizzaInfo: {
        "costs": [
            0, 0, 0
        ],
        "picture_server_path": "string",
        "title": "string",
        "weights": [0, 0, 0],
        "ingredients": [
            "string"
        ]
    }
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
            state.pizzaInfo = {
                "costs": [
                    0, 0, 0
                ],
                "picture_server_path": "string",
                "title": "string",
                "weights": [0, 0, 0],
                "ingredients": [
                    "string"
                ]
            }
        }
    }
})
export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;