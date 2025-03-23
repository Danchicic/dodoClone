import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setRegion} from "../redux/regionSlice";
import PizzaApi from "../api/PizzaApi.js";
import PizzasView from "../components/PizzasView.jsx";

const MainPage = () => {
    const params = useParams();
    const userRegion = params.region;
    const dispatch = useDispatch();
    const selectedRegion = useSelector((state) => state.region);
    const route = useNavigate();
    const [pizzas, setPizzas] = useState([]);
    useEffect(() => {
        PizzaApi.get_all(userRegion).then(
            (res) => {
                if (res.status === 200) {
                    res.json().then(
                        (data) => {
                            if (data) {
                                setPizzas(data)
                            }
                        }
                    )
                }
            }
        )
    }, []);

    useEffect(() => {
        if (userRegion && userRegion !== selectedRegion) {
            dispatch(setRegion(userRegion));
        } else if (!userRegion && selectedRegion) {
            route(`/${selectedRegion}`)
        }
    }, [])
    return (
        <>
            <h1
                className="text-5xl flex justify-center mb-7"
            >
                Pizza's
            </h1>
            <PizzasView pizzas={pizzas}/>
        </>


    );
};

export default MainPage;