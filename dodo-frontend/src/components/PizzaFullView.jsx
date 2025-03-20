import React, {useState} from 'react';
import ModalFade from "./ModalFade.jsx";
import {capitalize} from "./utils.js";

const PizzaFullView = () => {
    const pizzaInfo = {
        "costs": [
            549, 819, 999
        ],
        "picture_server_path": "string",
        "title": "string",
        "weights": [410, 570, 770],
        "ingredients": [
            "string",
            "string",
            "string",
            "string",
            "string"
        ]
    };
    const [pizzaSize, setPizzaSize] = useState(30);
    const [pizzaDough, setPizzaDough] = useState('Традиционное');
    const [weight, setWeight] = useState(pizzaInfo.weights[1]);
    const [cost, setCost] = useState(pizzaInfo.costs[1]);

    return (
        <ModalFade classes="shadow-2xl w-7/10 rounded-2xl">
            <div className="flex h-100">
                <div className="w-full bg-white">
                    <img src={pizzaInfo.picture_server_path} alt=""/>

                </div>
                <div className="w-full bg-gray-100 inset-shadow-sm pt-10 pl-10">
                    <div className="text-lg font-bold">
                        {capitalize(pizzaInfo.title)}
                    </div>
                    <div className="text-md font-light">
                        {pizzaSize} см, {pizzaDough}, {weight} г
                    </div>
                    <div className="text-md font-middle">
                        {pizzaInfo.ingredients.join(', ')}
                    </div>
                    <div className="button-sliders mb-50">
                        <fieldset>
                            <div className="flex gap-5">
                                <div className="">
                                    <input type="radio" id="25" value="25" name="drone"/>
                                    <label htmlFor="25">25</label>
                                </div>
                                <div className="">
                                    <input type="radio" id="30" value="30" name="drone"/>
                                    <label htmlFor="30">30</label>
                                </div>
                                <div className="">
                                    <input type="radio" id="35" value="35" name="drone"/>
                                    <label htmlFor="35">35</label>
                                </div>
                            </div>

                        </fieldset>
                        <div className="dough-slider">

                        </div>
                    </div>
                    <button
                        className="px-5 py-2 bg-emerald-200 rounded-2xl">
                        В корзину за {cost} р.
                    </button>
                </div>

            </div>

        </ModalFade>

    );
};

export default PizzaFullView;