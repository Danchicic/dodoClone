const host = "http://localhost:8080/api";

class PizzaApi {
    static get_all = (regionSlug) => {
        return fetch(
            `${host}/main/products/${regionSlug}`,
        );
    }
    static get_all_regions = () => {
        return fetch(
            `${host}/main/regions`
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

export default PizzaApi;