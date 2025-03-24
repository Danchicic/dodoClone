import React, { useEffect, useState } from "react";
import ModalFade from "./ModalFade.jsx";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";

const Cart = ({ showCart, setShowCart }) => {
  const { isOpen, pizzas, cost, productsCount } = useSelector(
    (state) => state.cart
  );

  return (
    <div
      className={`${showCart ? "fixed inset-0 w-full h-[100vh]  bg-black/70 z-10000" : "hidden"}  backdrop-blur-sm`}
    >
      <div
        className={`${showCart ? "animate-cart-appear" : "animate-hide-cart"} absolute right-0`}
      >
        <div
          className={`absolute -translate-y-1/2 pr-4 -translate-x-full top-1/2`}
        >
          <span className="text-emerald-400 ">
            <X
              onClick={() => setShowCart(false)}
              className="size-12 hover:scale-x-105 hover:scale-y-105 hover:rotate-90 hover:transition hover:duration-700 hover:ease-in-out -rotate-90 duration-700 transition cursor-pointer"
            />
          </span>
        </div>
        <div className="flex flex-col bg-white/95 items-center w-105 justify-center h-[100vh] ">
          <h2 className="mt-6 text-black font-semibold text-xl">
            Пока тут пусто
          </h2>
          <p className="text-center mt-4">Добавьте пиццу. Или две!</p>
          <p className="text-center mt-0">А мы доставим ваш заказ от 649 ₽</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
