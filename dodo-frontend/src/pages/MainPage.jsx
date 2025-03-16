import React, {useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { setRegion } from "../redux/regionSlice";

const MainPage = () => {
    const params = useParams();
    const userRegion = params.region;
    const dispatch = useDispatch();
    const selectedRegion = useSelector((state) => state.region);
    const route = useNavigate();
    useEffect(() => {
        if (userRegion && userRegion !== selectedRegion) {
            dispatch(setRegion(userRegion));
        }else if (!userRegion && selectedRegion) {
            route(`/${selectedRegion}`)
        }
    }, [])
    return (
        <div className="flex align-bottom justify-center">
            <h1 className="text-lg">
                Your region is {userRegion}
            </h1>
        </div>
    );
};

export default MainPage;