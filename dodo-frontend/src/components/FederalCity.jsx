import React from 'react';
import {Link} from "react-router-dom";

const FederalCity = ({children, slug}) => {
    return (
        <div className="flex gap-2">
            <span
                className="text-xl font-medium text-black hover:text-emerald-300 hover:transition-all cursor-pointer"
            >
                <Link
                    to={slug}>
                    {children}
                </Link>
            </span>
        </div>

    );
};

export default FederalCity;