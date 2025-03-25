import React, {useEffect, useState} from 'react';
import ModalFade from "./ModalFade.jsx";
import {capitalize} from "./utils.js";
import {createPortal} from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import RadioButtonGroup from "./RadioButtonGroup.jsx";
import Button from "./UI/Button.jsx";
import {closeModal} from "../redux/pizzaModalSlice.js";
import {pushToCart} from "../redux/cartSlice.js";

const PizzaFullView = () => {
    const {isOpen, pizzaInfo} = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    const sizeOptions = [
        {value: "25", label: "25 см"},
        {value: "30", label: "30 см"},
        {value: "35", label: "35 см"},
    ];
    const doughOptions = [
        {"value": "fat", label: "Толстое"},
        {"value": "thin", label: "Тонкое"}
    ]

    const [pizzaSize, setPizzaSize] = useState(30);
    const [pizzaDough, setPizzaDough] = useState('Традиционное');
    const [weight, setWeight] = useState(null);
    const [cost, setCost] = useState(null);

    useEffect(() => {
        if (pizzaInfo) {
            setWeight(pizzaInfo.weights[1]);
            setCost(pizzaInfo.costs[1]);
        }
    }, [pizzaInfo]);

    function handleSizeChange() {
    }

    function handleDoughChange() {
    }

    function addToCart() {
        dispatch(pushToCart(
            {
                title: pizzaInfo.title,
                cost,
                pizzaSize,
                pizzaDough,
                weight,
                picture: pizzaInfo.picture_server_path,
            }
        ))
    }

    return createPortal(
        <ModalFade
            classes="justify-center shadow-2xl w-7/10 rounded-2xl"
            onClick={() => dispatch(closeModal())}
            isOpen={isOpen}
        >
            <div className="flex h-100">
                <div className="w-full bg-white">
                    <img src={pizzaInfo.picture_server_path} alt=""/>
                </div>

                <div className="w-full bg-gray-100 inset-shadow-sm pt-10 pl-10 pr-10">
                    <div className="text-lg font-bold">
                        {capitalize(pizzaInfo.title)}
                    </div>
                    <div className="text-md font-light">
                        {pizzaSize} см, {pizzaDough}, {weight} г
                    </div>
                    <div className="text-md font-middle">
                        {pizzaInfo.ingredients.join(', ')}
                    </div>
                    <div className="button-sliders flex gap-1 flex-col lg:mb-20">
                        <RadioButtonGroup
                            options={sizeOptions}
                            onChange={handleSizeChange}
                        />
                        <RadioButtonGroup
                            options={doughOptions}
                            onChange={handleDoughChange}
                        />
                    </div>
                    <div className="flex justify-self-center">
                        <Button
                            onClick={addToCart}>
                            В корзину за {cost} р.
                        </Button>
                    </div>
                </div>

            </div>
        </ModalFade>,
        document.getElementById("pizzaModal")
    );
};

export default PizzaFullView;