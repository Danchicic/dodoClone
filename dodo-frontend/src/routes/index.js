import Auth from "../pages/Auth.jsx";
import MainPage from "../pages/MainPage.jsx";
import GetRegionModal from "../components/GetRegionModal.jsx";
import Profile from "../pages/Profile.jsx";
import PizzaFullView from "../components/PizzaFullView.jsx";
import RestaurantViewPage from "../pages/RestaurantViewPage.jsx";
// import NotFound404 from "../pages/NotFound404.jsx";

const privateRoutes = [
    {path: "/:region", component: MainPage, exact: true},
    {path: "/:region/profile", component: Profile, exact: true},
    {path: "/", component: GetRegionModal, exact: true},
    {path: "/restaurant/:region", component: RestaurantViewPage, exact: true},
]

const publicRoutes = [
    {path: "/auth/login", component: Auth, exact: false},
    // {path: "*", component: NotFound404, exact: false},
]
privateRoutes.forEach(
    (route) =>
        route.public = false
)
publicRoutes.forEach(route => route.public = true);
export const userRoutes = privateRoutes.concat(publicRoutes);
