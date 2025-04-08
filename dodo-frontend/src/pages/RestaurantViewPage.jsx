import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import RestaurantOrdersList from "../components/RestaurantOrdersList.jsx";

const RestaurantViewPage = () => {
    const params = useParams();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8002/api/restaurants/ws/orders/${params.region}`);

        console.log("start ws onmessage")
        socket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            setOrders((prevOrders) => [JSON.stringify(data), ...prevOrders]);
        }
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
        return () => {
            console.log("Closing WebSocket connection");
            socket.close();
        };
    }, [params.region])

    const removeOrder = (orderIdToDelete) => {
        setOrders(
            orders.filter(order => order.id !== orderIdToDelete)
        )
    }

    return (
        <RestaurantOrdersList
            removeOrder={removeOrder}
            orders={orders}
            setOrders={setOrders}
        />
    );
};

export default RestaurantViewPage;