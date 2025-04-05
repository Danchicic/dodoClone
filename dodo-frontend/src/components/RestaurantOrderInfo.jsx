import React from 'react';
import {useState} from 'react';
import Button from "./UI/Button.jsx";

const RestaurantOrderInfo = ({removeOrder, socket, orderInfo}) => {
    const orderStates = {
        1: "Принять",
        2: "Передать в доставку",
    }
    const [orderStatus, setOrderStatus] = useState(1);
    const setNewState = () => {
        setOrderStatus(orderStatus + 1);
        if (!socket) {
            return;
        }
        switch (orderStatus) {
            case 1:
                socket.send(
                    JSON.stringify({
                        orderId: orderInfo.id,
                        type: "accept"
                    })
                )
                break;
            case 2:
                socket.send(
                    JSON.stringify({
                        orderId: orderInfo.id,
                        type: "move to delivery"
                    })
                )
                removeOrder(orderInfo.id)
                break;

        }
    }
    return (
        <div className="flex gap-2 flex-col border-2 border-solid rounded-2xl border-emerald-200 px-3 py-2">
            <div
                className="flex justify-between items-center   w-full h-10 "
            >
                <div className="">
                    ID заказа: {orderInfo.id}
                </div>
                <div className="">
                    Кол-во: {orderInfo['pizzas'].length}
                </div>
                <div className="">
                    Имя: {orderInfo['username']}
                </div>

            </div>
            <div className="flex justify-between">
                <ol>
                    {orderInfo['pizzas'].map((pizza, index) => (
                        <li key={index}>
                            {index + 1}) {pizza.title} - размер: {pizza.pizzaSize} см - тесто: {pizza.pizzaDough}
                        </li>
                    ))}
                </ol>
            </div>
            <Button
                onClick={setNewState}>
                {orderStates[orderStatus]}
            </Button>
        </div>

    );
};

export default RestaurantOrderInfo;