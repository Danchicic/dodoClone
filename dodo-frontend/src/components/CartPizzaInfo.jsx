import React from 'react';

const CartPizzaInfo = ({pizzaInfo}) => {
    const pizza = pizzaInfo.pizza;
    return (
        <div className="flex p-3 flex-col gap-3">
            <div className="flex items-center gap-4">
                <img src={`${pizza.picture}`} alt="" className="w-3/10"/>
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">{pizza.title}</h3>
                    <div className="">
                        {pizza.pizzaSize}, {pizza.pizzaDough} тесто
                    </div>
                </div>
            </div>

            <hr/>

            <div className="flex justify-between">
                <h3 className="text-xl font-bold">{pizza.cost * pizzaInfo.count} ₽</h3>
                <div className="flex gap-4 items-center">
                    <div className="text-xl font-bold">Кол-во: {pizzaInfo.count}</div>
                </div>
            </div>
        </div>
    );
};

export default CartPizzaInfo;