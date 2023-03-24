import './styles/App.scss'
import {Navigate, Route, Routes} from "react-router-dom";
import Registration from "./Pages/Registration.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectIsAuth} from "./redux/slices/auth.js";
import {useEffect} from "react";
import AddCar from "./Pages/AddCar.jsx";

function App() {

    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])

    // const width = window.innerWidth
    //
    // if(width > 500) {
    //     return (
    //         <div>
    //             only mobile
    //         </div>
    //     )
    // }

    return (
        <Routes>
            {
                isAuth ?
                    <>
                        <Route path={'/'} element={<Home />}/>
                        <Route path={'/addcar'} element={<AddCar />}/>
                        <Route path={'/*'} element={<Navigate to={'/'}/>}/>
                    </>
                    :
                    <>
                        <Route path={'/register'} element={<Registration />}/>
                        <Route path={'/login'} element={<Login />}/>
                        <Route path={'/*'} element={<Navigate to={'/register'}/>}/>

                    </>
            }

        </Routes>
    )
}

export default App
