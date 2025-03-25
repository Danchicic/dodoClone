import React from "react";
import {useSelector} from "react-redux";
import {X} from "lucide-react";
import ModalFade from "./ModalFade.jsx";
import CartPizzaInfo from "./CartPizzaInfo.jsx";
import Button from "./UI/Button.jsx";
import PizzaApi from "../api/PizzaApi.js";
import {useNavigate} from "react-router-dom";

const Cart = ({showCart, setShowCart}) => {
    const navigate = useNavigate();
    const {pizzas, cost, productsCount} = useSelector(
        (state) => state.cart
    );
    const createOrder = async () => {
        PizzaApi.createOrder(pizzas).then(response => {
            if (response.status === 201) {
                response.json().then(orderInfo => {
                    console.log("success")
                    console.log(orderInfo)
                    // navigate(`orders/${orderInfo.id}`)
                })
            } else {
                alert("Error while creating order")
            }
        }).catch(error => {
            console.log("52", error)
            alert("Error while creating order check console")

        })

    }
    return (
        <ModalFade isOpen={showCart}>
            <div
                className={`${showCart ? "fixed inset-0 w-full h-[100vh]  bg-black/70 z-10000" : "hidden"}  backdrop-blur-sm`}
            >
                <div
                    className={`${showCart ? "animate-cart-appear" : "animate-hide-cart"} absolute right-0`}
                >
                    <div
                        className={`absolute -translate-y-1/2 pr-4 -translate-x-full top-1/2`}
                    >
          <span className="text-emerald-400">
            <X
                onClick={() => setShowCart(false)}
                className="size-12 hover:scale-x-105 hover:scale-y-105 hover:rotate-90 hover:transition hover:duration-700 hover:ease-in-out -rotate-90 duration-700 transition cursor-pointer"
            />
          </span>
                    </div>
                    <div
                        className={`flex flex-col bg-white/95 items-center w-105  h-[100vh] ${pizzas.length > 0 ? "justify-between" : "justify-center"}`}>
                        {pizzas.length === 0 &&
                            <>
                                <h2 className="mt-6 text-black font-semibold text-xl">
                                    Пока тут пусто
                                </h2>
                                <p className="text-center mt-4">Добавьте пиццу. Или две!</p>
                                <p className="text-center mt-0">А мы доставим ваш заказ от 649 ₽</p>
                            </>
                        }
                        {pizzas.length > 0 &&
                            <>
                                <div className="">
                                    {pizzas.map((pizzaCartInfo, idx) => (
                                        <CartPizzaInfo key={idx} pizzaInfo={pizzaCartInfo}/>
                                    ))

                                    }
                                </div>


                                <div className="flex flex-col mb-10 gap-5">
                                    <div className="flex gap-10">
                                        <div className="">
                                            Сумма: <span className="font-bold">{cost} ₽</span>

                                        </div>
                                        <div className="">
                                            Кол-во: <span className="font-bold">{productsCount}</span>
                                        </div>
                                    </div>

                                    <Button onClick={createOrder} className="self-end">Создать заказ</Button>
                                </div>

                            </>

                        }

                    </div>

                </div>
            </div>
        </ModalFade>

    );
};

export default Cart;
