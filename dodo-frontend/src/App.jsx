import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import Navbar from "./components/Navbar.jsx";
import PizzaFullView from "./components/PizzaFullView.jsx";
import Cart from "./components/Cart.jsx";

function App() {


    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
            <PizzaFullView/>
            <Cart/>
        </BrowserRouter>

    )
}

export default App
