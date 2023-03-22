import './styles/App.scss'
import {Route, Routes} from "react-router-dom";
import Registration from "./Pages/Registration.jsx";
import Login from "./Pages/Login.jsx";

function App() {

    const isAuth = false;

    return (
        <Routes>
            <Route path={'/register'} element={<Registration />}/>
            <Route path={'/login'} element={<Login />}/>
        </Routes>
    )
}

export default App
