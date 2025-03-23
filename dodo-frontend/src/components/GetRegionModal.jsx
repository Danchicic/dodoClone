import React, {useEffect, useState} from 'react';
import FederalCity from "./FederalCity.jsx";
import CityView from "./CityView.jsx";
import PizzaApi from "../api/PizzaApi.js";
import ModalFade from "./ModalFade.jsx";

const GetRegionModal = () => {
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);
    const [serverCities, setServerCities] = useState([]);
    useEffect(
        () => {
            PizzaApi.get_all_regions().then(
                (response) => {
                    response.json().then(
                        (response) => {
                            setServerCities(response);
                            setCities(
                                [...response].filter((cityInList) => {
                                        return cityInList['name'].toLowerCase().includes(city.trim().toLowerCase())
                                    }
                                )
                            );
                        }
                    )
                }
            )

        },
        []
    )
    useEffect(() => {
        setCities(
            [...serverCities].filter((cityInList) => {
                    return cityInList['name'].toLowerCase().includes(city.trim().toLowerCase())
                }
            )
        );
    }, [city])
    return (
        <ModalFade classes="shadow-2xl rounded-2xl p-10 pb-10 bg-white w-7/10 mh-3/10" isOpen={true}>
            <div className="flex items-center">
                <img
                    className="w-30"
                    src="/logo.png"
                    alt="logo"
                />
                <input
                    type="text" onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="h-8 px-2 py-1 border-2 border-gray-300 rounded-md"
                />
            </div>
            <div className="flex gap-10 pl-8">
                <FederalCity slug="moscow">Москва</FederalCity>
                <FederalCity slug="spb">Санкт петербург</FederalCity>
            </div>
            <div>
                <CityView cities={cities}/>
            </div>
        </ModalFade>

    );
};

export default GetRegionModal;