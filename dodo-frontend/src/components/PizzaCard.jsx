import React from 'react';
import {capitalize} from "./utils.js";
import {openModal} from "../redux/pizzaModalSlice.js";
import {useDispatch} from "react-redux";
import Button from "./UI/Button.jsx";


const PizzaCard = ({pizzaInfo}) => {
    const dispatch = useDispatch();
    console.log(pizzaInfo);
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
    try {
        pizzaInfo.ingredients[0] = capitalize(pizzaInfo.ingredients[0])
    } catch (err) {

    }

    return (
        <div
            className="bg-white rounded-lg w-10/10 p-5"
        >
            <div>
                <img
                    className=""
                    src={pizzaInfo.picture_server_path} alt=""/>
            </div>
            <div className="flex flex-col justify-between">
                <div className="">
                    <div className="text-lg font-bold">
                        {pizzaInfo.title}
                    </div>
                    <div
                        className="font-light text-md"
                    >
                        {pizzaInfo.ingredients.join(", ")}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="font-bold text-lg">
                        от {pizzaInfo.costs[0]} р.
                    </div>
                    <Button
                        onClick={() => {
                            dispatch(openModal(pizzaInfo))
                        }}
                    >
                        Выбрать
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default PizzaCard;