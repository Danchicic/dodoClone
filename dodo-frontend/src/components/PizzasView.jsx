import React from 'react';
import PizzaCard from "./PizzaCard.jsx";

const PizzasView = ({pizzas}) => {
    return (
        <div className="grid gap-4 grid-cols-4">
            {pizzas.map((pizza, idx) => (
                <PizzaCard pizzaInfo={pizza} key={idx}/>
            ))}
        </div>
    );
};

export default PizzasView;