import React, {useEffect, useState} from 'react';
import ModalFade from "./ModalFade.jsx";
import {useDispatch, useSelector} from "react-redux";
import {closeCart} from "../redux/cartSlice.js";
import {createPortal} from "react-dom";

const Cart = () => {
    const {isOpen, pizzas, cost, productsCount} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return createPortal(
        <ModalFade
            onClick={() => {
                dispatch(closeCart())
            }}
            isOpen={isOpen}
            renderWithoutBody
        >
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-emerald-300 text-black shadow-lg transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {isOpen &&
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">Корзина</h2>
                    </div>
                }

            </div>
        </ModalFade>,
        document.getElementById("cart")
    );
};

export default Cart;