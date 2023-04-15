import React from 'react';
import HeaderBack from "../Components/Header/HeaderBack.jsx";
import Title from "../Components/UI/Title.jsx";
import MyContainer from "../Components/UI/MyContainer.jsx";
import ChangeCurrentCurrency from "../Components/Settings/ChangeCurrentCurrency.jsx";
import styles from "../styles/Settings.module.scss"

const Settings = () => {
    return (
        <div className={styles.Settings}>
            <HeaderBack />
            <MyContainer>
                <Title>Settings</Title>
                <div className={styles.Settings__menu}>
                    <ChangeCurrentCurrency />
                </div>
            </MyContainer>
        </div>
    );
};

export default Settings;