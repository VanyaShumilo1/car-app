import React from 'react';
import styles from '../styles/GarageList.module.scss'
import GarageItem from "./GarageItem.jsx";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const GarageList = ({cars, ...props}) => {
    return (
        <TransitionGroup className={styles.garageList}>
            {
                cars.map(car => (
                    <CSSTransition
                        key={car._id}
                        timeout={400}
                        classNames={"cars"}
                    >
                        <GarageItem car={car}/>
                    </CSSTransition>
                ))
            }
        </TransitionGroup>
    );
};

export default GarageList;