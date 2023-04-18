import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "../redux/slices/auth.js";
import {fetchCars, fetchOutgoingsFromCar} from "../redux/slices/car.js";
import Header from "../Components/Header/Header.jsx";
import Sidebar from "../Components/Sidebar/Sidebar.jsx";
import {countOutgoings, createOutgoingsArraysWithExchange} from "../utils/countOutgoings.js";
import CarList from "../Components/CarList.jsx";
import Chart from 'react-apexcharts'
import chartStyles from '../styles/Chart.module.scss'
import CircleLinkButton from "../Components/UI/CircleLinkButton.jsx";
import OutgoingsList from "../Components/OutgoingsList.jsx";
import Title from "../Components/UI/Title.jsx";
import styles from '../styles/Home.module.scss'
import {SumArray} from "../utils/SumArray.js";
import {PricePerDay} from "../utils/PricePerDay.js";
import Loader from "../Components/Loader.jsx";


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
        dispatch(fetchOutgoingsFromCar(currentCar?._id)).then(() => setIsChartLoading(false))
    }, [currentCar])

    useEffect(() => {
        setPrice(countOutgoings(outgoings))
    }, [outgoings])

    const currentCurrency = useSelector(state => state.car.currentCurrency)
    const getOutgoingArrays = async () => {
        return await createOutgoingsArraysWithExchange(outgoings, currentCurrency)
    }

    const [keys, setKeys] = useState([])
    const [values, setValues] = useState([])
    const [isChartLoading, setIsChartLoading] = useState(true)

    useEffect(() => {
        getOutgoingArrays().then(data => {
            setKeys(Object.keys(data))
            setValues(Object.values(data))

        })
    }, [outgoings])

    const pricePerDay = PricePerDay(currentCar?.createdAt, SumArray(values))

    return (
        <div>
            <Header sidebar={sidebar} setSidebar={setSidebar} isCarListActive={isCarListActive}
                    setCarListActive={setCarListActive}/>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <CarList isCarListActive={isCarListActive} setCarListActive={setCarListActive}/>
            {
                currentCar
                    ? isChartLoading
                        ? <Loader />
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
                                                            color: "white",
                                                            formatter: (val) => {
                                                                return SumArray(val.config.series).toFixed(0) + ` ${currentCurrency}`
                                                            }
                                                        },
                                                        value: {
                                                            show: true,
                                                            color: "white",
                                                            formatter: (val) => {
                                                                return Number(val).toFixed(0)+ ` ${currentCurrency}`
                                                            }
                                                        },

                                                    }
                                                }
                                            }
                                        }
                                    }}
                                />
                                <div className={styles.perDay}>
                                    {pricePerDay.toFixed(0)} {currentCurrency} per day
                                </div>
                                <OutgoingsList outgoings={outgoings} pricePerDay={pricePerDay}/>
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