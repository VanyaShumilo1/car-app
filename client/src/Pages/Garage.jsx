import React, {useEffect} from 'react';
import HeaderBack from "../Components/Header/HeaderBack.jsx";
import {useSelector} from "react-redux";
import Title from "../Components/UI/Title.jsx";
import {Container} from "@mui/material";
import styles from '../styles/Container.module.scss'
import GarageList from "../Components/GarageList.jsx";

const Garage = (props) => {

    const cars = useSelector((state) => state.car.cars.items)

    return (
        <div>
            <HeaderBack/>
            <Container className={styles.container}>
                <Title>Garage ({cars.length} cars)</Title>
                <GarageList cars={cars}/>
            </Container>

        </div>
    );
};

export default Garage;