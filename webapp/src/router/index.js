
import HomeModal from "../pages/home";
import PersonalModal from "../pages/personal";

let routers = [
    {
        path:"/",
        exact:true,
        component:HomeModal
    },
    {
        path:"/personal",
        component:PersonalModal
    }
];


export default routers;