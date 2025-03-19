import React from 'react';
import PizzaCard from "./PizzaCard.jsx";

const PizzasView = ({pizzas}) => {
    return (
        <div>
            {pizzas.map((pizza, idx) => (
                <PizzaCard pizzaInfo={pizza} key={idx}/>
            ))}
        </div>
    );
};

export default PizzasView;