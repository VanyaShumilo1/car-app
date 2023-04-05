import React from 'react';
import styles from '../styles/CarList.module.scss';
import {useSelector} from "react-redux";
import CarListItem from "./CarListItem.jsx";

const CarList = ({isCarListActive, setCarListActive, ...props}) => {

    const currentCar = useSelector(state => state.car.currentCar)
    const cars = useSelector(state => state.car.cars.items)

    return (
        <div className={[styles.carList, isCarListActive && styles.active].join(' ')}>
            {
                cars.map(car => {
                    return (
                        <CarListItem
                            key={car._id}
                            isCurrentCar={car._id === currentCar._id}
                            isCarListActive={isCarListActive}
                            setCarListActive={setCarListActive}
                            car={car}

                        />
                    )
                })
            }
        </div>
    );
};

export default CarList;