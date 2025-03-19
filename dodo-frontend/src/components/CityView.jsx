import React from 'react';
import {Link} from "react-router-dom";

const CityView = ({cities}) => {
    return (
        <div className="grid grid-cols-3 px-8 py-5">
            {cities.map((cityInfo, index) => {
                return (
                    <div key={index}>
                        <Link className="
                         text-lg hover:text-emerald-300 hover:transition-all cursor-pointer"
                              to={cityInfo['slug']}
                        >
                            {cityInfo['name']}
                        </Link>
                    </div>
                )
            })}
        </div>
    );
};

export default CityView;