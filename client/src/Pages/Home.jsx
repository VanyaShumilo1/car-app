import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../redux/slices/auth.js";
import {Link} from "react-router-dom";
import {fetchCars} from "../redux/slices/car.js";
import Header from "../Components/Header/Header.jsx";

const Home = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    const car = useSelector((state) => state.car.cars.items)
    const user = useSelector((state) => state.auth.data)

    const onClickLogout = () => {
        dispatch(logout())
    };

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchCars())
        }
    }, [])

    console.log(user.email)
    console.log(car.length)

    return (
        <div>
            <Header/>
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