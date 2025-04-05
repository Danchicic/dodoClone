import React from 'react';
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import RestaurantOrderInfo from "../components/RestaurantOrderInfo.jsx";
import RestaurantOrdersList from "../components/RestaurantOrdersList.jsx";

const RestaurantViewPage = () => {
    const params = useParams();
    const [orders, setOrders] = useState([]);
    const [restaurantSocket, setSocket] = useState(null);
    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8002/api/restaurant/ws/orders/${params.region}`);

        console.log("start ws onmessage")
        socket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            setOrders((prevOrders) => [JSON.stringify(data), ...prevOrders]);
        }
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
        setSocket(socket);
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
            socket={restaurantSocket}
            orders={orders}
            setOrders={setOrders}
        />
    );
};

export default RestaurantViewPage;