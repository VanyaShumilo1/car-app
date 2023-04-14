import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../redux/slices/auth.js";
import {fetchCars, fetchOutgoingsFromCar} from "../redux/slices/car.js";
import Header from "../Components/Header/Header.jsx";
import Sidebar from "../Components/Sidebar/Sidebar.jsx";
import {countOutgoings, createOutgoingsArrays, createOutgoingsArraysWithExchange} from "../utils/countOutgoings.js";
import CarList from "../Components/CarList.jsx";
import Chart from 'react-apexcharts'
import chartStyles from '../styles/Chart.module.scss'
import CircleLinkButton from "../Components/UI/CircleLinkButton.jsx";
import OutgoingsList from "../Components/OutgoingsList.jsx";
import Title from "../Components/UI/Title.jsx";
import styles from '../styles/Home.module.scss'

const Home = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const outgoings = useSelector((state) => state.car.outgoings.items)
    const [sidebar, setSidebar] = useState('')
    const [isCarListActive, setCarListActive] = useState('')

    const [price, setPrice] = useState(0)

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

    //const [keys, values] = createOutgoingsArrays(outgoings)

    const func = async () => {
        return await createOutgoingsArraysWithExchange(outgoings)
    }

    const [keys, setKeys] = useState([])
    const [values, setValues] = useState([])
    const [isChartLoading, setIsChartLoading] = useState(true)

    useEffect(() => {
        func().then(data => {
            console.log(data)
            setKeys(Object.keys(data))
            setValues( Object.values(data))
            setIsChartLoading(false)
        })
    }, [outgoings])



    console.log(keys)

    console.log(values)

    return (
        <div>
            <Header sidebar={sidebar} setSidebar={setSidebar} isCarListActive={isCarListActive}
                    setCarListActive={setCarListActive}/>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <CarList isCarListActive={isCarListActive} setCarListActive={setCarListActive}/>
            {
                currentCar
                    ? isChartLoading ?
                        <div>Loading...</div>
                        :
                        (
                            <>
                                <Chart
                                    className={chartStyles.chart}
                                    type={'donut'}
                                    width={window.innerWidth}
                                    height={400}
                                    series={values}
                                    options={{
                                        chart: {
                                            foreColor: '#fff',
                                            animations: {
                                                enabled: true,
                                                easing: 'easein',
                                                speed: 800,
                                                animateGradually: {
                                                    enabled: true,
                                                    delay: 150
                                                },
                                                dynamicAnimation: {
                                                    enabled: true,
                                                    speed: 350
                                                }
                                            }
                                        },

                                        labels: keys,
                                        theme: {
                                            palette: 'palette6' // upto palette10
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

                                <OutgoingsList outgoings={outgoings}/>
                                <CircleLinkButton to={'/addoutgoing'}>+</CircleLinkButton>
                            </>
                        )
                    :
                    <div className={styles.noCar}>
                        <Title>
                            Now you need to add a car, you can do it by click on "+" on top right corner
                        </Title>
                    </div>
            }

        </div>
    );
};

export default Home;