import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import Navbar from "./components/Navbar.jsx";
import PizzaFullView from "./components/PizzaFullView.jsx";

function App() {


    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
            <PizzaFullView/>
        </BrowserRouter>

    )
}

export default App
