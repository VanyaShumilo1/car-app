import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../redux/slices/auth.js";
import {Link} from "react-router-dom";
import {fetchCars, fetchOutgoings, fetchOutgoingsFromCar} from "../redux/slices/car.js";
import Header from "../Components/Header/Header.jsx";
import Sidebar from "../Components/Sidebar/Sidebar.jsx";
import {countOutgoings, testFunc} from "../utils/countOutgoings.js";
import CarList from "../Components/CarList.jsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
const Home = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    const car = useSelector((state) => state.car.cars.items)
    const user = useSelector((state) => state.auth.data)
    const outgoings = useSelector((state) => state.car.outgoings.items)

    const [sidebar, setSidebar] = useState('')
    const [isCarListActive, setCarListActive] = useState('')


    const [price, setPrice] = useState(0)

    const onClickLogout = () => {
        dispatch(logout())
    };

    const currentCar = useSelector(state => state.car.currentCar)
    useEffect(() => {
        if (isAuth) {
            dispatch(fetchCars())
        }
    }, [])

    useEffect(() => {
        dispatch(fetchOutgoingsFromCar(currentCar?._id))
    }, [currentCar])

    useEffect(() => {
        setPrice(countOutgoings(outgoings))
    }, [outgoings])

    const [k, v] = testFunc(outgoings)

    console.log(k)
    console.log(v)

    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: k,
        datasets: [
            {
                label: '# of Votes',
                data: v,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Header sidebar={sidebar} setSidebar={setSidebar} isCarListActive={isCarListActive} setCarListActive={setCarListActive}/>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <CarList isCarListActive={isCarListActive} setCarListActive={setCarListActive}/>

            <Doughnut data={data} />

            <Link to={'/login'}>log</Link>
            <button onClick={onClickLogout}>Logout</button>
            <div>
                {user?.email}
                {price}
            </div>
            <div>
                {car.length}
            </div>
        </div>
    );
};

export default Home;