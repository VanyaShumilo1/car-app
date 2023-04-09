import React from 'react';
import styles from '../styles/GarageListItem.module.scss'
import {capitalize} from "../utils/capitalize.js";
import {Button} from "@mui/material";
import {removeCar} from "../redux/slices/car.js";
import {useDispatch} from "react-redux";
import axios from "../axios.js";



const GarageItem = ({car, ...props}) => {

    const thisCar = car
    const dispatch = useDispatch()
    const deleteCar = async () => {
        console.log(123)
        await axios.delete(`/car/${thisCar._id}`)
        dispatch(removeCar(thisCar._id))
    }

    return (
        <div className={styles.garageItem}>
            <div className={styles.title}>{capitalize(car.brand)} {capitalize(car.model)} {car.year}</div>
            <div className={styles.text}>
                <div className={styles.info}>
                    Fuel: {car.fuelType}
                </div>
                <div className={styles.info}>
                    Engine size: {car.engineSize.toFixed(1)}
                </div>
                {
                    car.description &&
                    <div className={styles.description}>
                        Description: {car.description}
                    </div>
                }
            </div>

            <Button className={styles.button} variant="outlined" color={'error'} onClick={deleteCar}>
                Delete
            </Button>
        </div>
    );
};

export default GarageItem;