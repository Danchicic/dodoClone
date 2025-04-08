const host = "http://localhost:8080/api";

class OrdersApi {
    static updateOrderStatus = async (orderId, body) => {
        return fetch(
            `${host}/restaurants/update_order_status/${orderId}`,
            {
                method: "PATCH",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body
            }
        );
    }
    static createOrder = (region, pizzas) => {
        // pizzas is an array with pizza info, count and count * price
        const pizzasList = [];
        // extracting only pizza info
        pizzas.forEach((pizzaShortInfo) => {
            pizzasList.push(pizzaShortInfo.pizza);
        })
        return fetch(
            `${host}/orders/create_order?region=${region}`,
            {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    //     "Authorization": `Bearer ${localStorage.getItem("access_token")}`,

                },
                body: JSON.stringify({
                    pizzas: pizzasList,
                })
            }
        )
    }
}

export default OrdersApi;