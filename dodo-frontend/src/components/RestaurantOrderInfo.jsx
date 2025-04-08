import React, {useState} from 'react';
import Button from "./UI/Button.jsx";
import {useParams} from "react-router-dom";
import OrdersApi from "../api/OrdersApi.js";

const RestaurantOrderInfo = ({removeOrder, orderInfo}) => {
    const dynamicUrlParams = useParams(state => state.region);
    const orderStates = {
        1: "Принять",
        2: "Передать в доставку",
    }
    const [orderStatus, setOrderStatus] = useState(1);
    const setNewState = async () => {
        switch (orderStatus) {
            case 1:
                await OrdersApi.updateOrderStatus(
                    orderInfo.id,
                    JSON.stringify({
                        status: "accepted",
                        region: dynamicUrlParams.region
                    })
                ).then(response =>{
                    if (response.status === 200) {
                        setOrderStatus(orderStatus + 1);

                    }

                })
                break;
            case 2:
                await OrdersApi.updateOrderStatus(
                    "",
                    JSON.stringify({
                        orderId: orderInfo.id,
                        status: "move_to_delivery",
                        region: dynamicUrlParams.region
                    }),
                )
                setOrderStatus(orderStatus + 1);
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