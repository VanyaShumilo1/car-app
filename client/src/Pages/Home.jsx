import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../redux/slices/auth.js";
import {Link} from "react-router-dom";
import {fetchCars, fetchOutgoings, fetchOutgoingsFromCar} from "../redux/slices/car.js";
import Header from "../Components/Header/Header.jsx";
import Sidebar from "../Components/Sidebar/Sidebar.jsx";
import {countOutgoings, createOutgoingsArrays} from "../utils/countOutgoings.js";
import CarList from "../Components/CarList.jsx";
import Chart from 'react-apexcharts'
import chartStyles from '../styles/Chart.module.scss'
import CircleLinkButton from "../Components/UI/CircleLinkButton.jsx";
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

    const [keys, values] = createOutgoingsArrays(outgoings)

    console.log(outgoings)
    console.log(window.innerWidth)

    return (
        <div>
            <Header sidebar={sidebar} setSidebar={setSidebar} isCarListActive={isCarListActive} setCarListActive={setCarListActive}/>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <CarList isCarListActive={isCarListActive} setCarListActive={setCarListActive}/>

            <Chart
                className={chartStyles.chart}
                type={'donut'}
                width={window.innerWidth}
                height={400}
                series={values}
                options={{
                    animations: {
                        enabled: true,
                    },

                    labels: keys,
                    theme: {
                        palette: 'palette6' // upto palette10
                    },
                    chart: {
                        foreColor: '#fff'
                    },

                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    show: true,
                                    total: {
                                        show: true,
                                        color: "white"
                                    }

                                }
                            }
                        }
                    }
                }}
            />

            <Link to={'/login'}>log</Link>
            <button onClick={onClickLogout}>Logout</button>
            <div>
                {user?.email}
                {price}
            </div>
            <div>
                {car.length}
            </div>

            {/*<CircleLinkButton to={'/addoutgoing'}>+</CircleLinkButton>*/}
        </div>
    );
};

export default Home;