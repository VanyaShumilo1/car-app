import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../redux/slices/auth.js";
import {Link} from "react-router-dom";
import {fetchCars, fetchOutgoings} from "../redux/slices/car.js";
import Header from "../Components/Header/Header.jsx";
import Sidebar from "../Components/Sidebar/Sidebar.jsx";

const Home = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    const car = useSelector((state) => state.car.cars.items)
    const user = useSelector((state) => state.auth.data)

    const [sidebar, setSidebar] = useState('')

    const onClickLogout = () => {
        dispatch(logout())
    };

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchCars())
            dispatch(fetchOutgoings())
        }
    }, [])

    return (
        <div>
            <Header sidebar={sidebar} setSidebar={setSidebar}/>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <Link to={'/login'}>log</Link>
            <button onClick={onClickLogout}>Logout</button>
            <div>
                {user?.email}
            </div>
            <div>
                {car.length}
            </div>
        </div>
    );
};

export default Home;