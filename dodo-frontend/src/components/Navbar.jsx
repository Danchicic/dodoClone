import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";


const Navbar = () => {
    const region = useSelector((state) => state.region);

    return (
        <nav className="flex flex-row gap-4 pl-10">
            <Link to="/profile">Profile</Link>
            <Link to={`/${region || ""}`}>
                <img
                    className="w-30"
                    src="../public/logo.png"
                    alt="logo"
                />
            </Link>
        </nav>
    );
};

export default Navbar;