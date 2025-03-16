import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {


    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>

    )
}

export default App
