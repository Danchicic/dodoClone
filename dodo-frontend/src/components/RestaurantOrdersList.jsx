import React from 'react';
import RestaurantOrderInfo from "./RestaurantOrderInfo.jsx";

const RestaurantOrdersList = ({removeOrder, orders, setOrders}) => {
    return (
        <ul
            className="flex gap-2 flex-col mt-5"
        >
            {orders.map((order) => (
                <li key={JSON.parse(order).id} className="list-none">
                    <RestaurantOrderInfo
                        removeOrder={removeOrder}
                        setOrders={setOrders}
                        orderInfo={JSON.parse(order)}/>
                </li>
            ))}
        </ul>
    );
};

export default RestaurantOrdersList;