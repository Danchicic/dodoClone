import React from 'react';
import {useState, useEffect} from "react";

const socket = new WebSocket('ws://localhost:8080/api/restaurant/ws/orders/');
const RestaurantVIewPage = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        socket.onmessage = (event) => {
            let data = event.data;
            setOrders((prevOrders) => [...prevOrders, data]);
        }
    })
    console.log(orders);
    return (
        <div>
        </div>
    );
};

export default RestaurantVIewPage;