import React from 'react';
import styles from '../styles/CarListItem.module.scss'
import {useDispatch} from "react-redux";
import {changeCurrentCar} from '../redux/slices/car.js'
const CarListItem = ({car, setCarListActive, isCarListActive, isCurrentCar}) => {

    const dispatch = useDispatch()

    const changeCar = () => {
        dispatch(changeCurrentCar(car))
        setCarListActive(
            isCarListActive === ''
                ? 'active'
                : ''
        )
    }

    return (
        <button className={[styles.carListItem, isCurrentCar && styles.active].join(' ')} onClick={changeCar}>
            <div className={styles.brand}>{car?.brand} {car?.model}</div>
            <div className={styles.year}>{car?.year}</div>
            <div className={styles.engine}>{car?.fuelType}, {car?.engineSize.toFixed(1)}</div>
        </button>
    );
};

export default CarListItem;