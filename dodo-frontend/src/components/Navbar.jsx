import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "./UI/Button.jsx";
import { useState } from "react";
import Cart from "./Cart.jsx";

const Navbar = () => {
  const region = useSelector((state) => state.region);
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="w-full top-0 left-0 sticky">
      <nav className="flex px-10 items-center justify-between">
        <div>
          <Link to={`/${region || ""}`}>
            <img className="w-30" src="logo.png" alt="logo" />
          </Link>
        </div>
        <div>
          <div className="flex gap-5 items-center relative">
            <Link to="/profile">Profile</Link>
            <Button onClick={() => setShowCart(true)}>Корзина</Button>
            <Cart showCart={showCart} setShowCart={setShowCart} />{" "}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
