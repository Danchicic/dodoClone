import React from 'react';
import {capitalize} from "./utils.js";


const PizzaCard = ({pizzaInfo}) => {
    /*
    {
    "costs": [
      0
    ],
    "picture_server_path": "string",
    "title": "string",
    "weight": 0,
    "ingredients": [
      "string"
    ]
  }
     */
    pizzaInfo.ingredients[0] = capitalize(pizzaInfo.ingredients[0])

    return (
        <div
            className="bg-white rounded-lg w-3/10 h-100 p-5"
        >
            <div className="w-10/10 h-7/10">
                <img
                    className=""
                    src={pizzaInfo.picture_server_path} alt=""/>
            </div>

            <div className="text-lg font-bold">
                {pizzaInfo.title}
            </div>
            <div
                className="font-light text-md"
            >
                {pizzaInfo.ingredients.join(", ")}
            </div>
            <div className="flex items-center h-19 justify-between">
                <div className="font-bold text-lg">
                    от {pizzaInfo.costs[0]} р.
                </div>
                <button
                    className="transition delay-75 rounded-2xl bg-emerald-200 px-3 py-1 hover:bg-emerald-400 cursor-pointer "
                >
                    Выбрать
                </button>
            </div>

        </div>
    );
};

export default PizzaCard;