import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


const Navbar = () => {
    const region = useSelector((state) => state.region);

    return (
        <div>
            <nav
                className="top-0 left-0 w-full sticky flex flex-row gap-4 pl-10 items-center backdrop-blur-md bg-white/30">
                <Link to={`/${region || ""}`}>
                    <img
                        className="w-30"
                        src="logo.png"
                        alt="logo"
                    />
                </Link>
                <Link to="/profile">Profile</Link>
            </nav>
        </div>

    );
};

export default Navbar;