import React from 'react';
import HeaderBack from "../Components/Header/HeaderBack.jsx";
import {useSelector} from "react-redux";

const Garage = (props) => {

    const cars = useSelector((state) => state.car.cars.items)

    return (
        <div>
            <HeaderBack/>
            
        </div>
    );
};

export default Garage;