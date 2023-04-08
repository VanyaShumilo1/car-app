import React from 'react';
import styles from '../../styles/SidebarMenu.module.scss'
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const SidebarMenu = () => {

    const cars = useSelector((state) => state.car.cars.items)

    return (
        <div className={styles.sidebarMenu}>

            <Link to={'/garage'} className={styles.sidebarMenu__item}>
                <div className={styles.sidebarMenu__wrapper}>
                    <div className={styles.sidebarMenu__icon}>
                        <svg width="30px" height="30px" viewBox="0 0 1024 1024" className="icon" version="1.1"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M122.1 861.3c0 30.6 25 55.8 55.6 55.8H290c30.6 0 55.6-25.3 55.6-56.2V720.8h335.3v140.1c0 31.2 24.8 56.2 55.6 56.2h112.3c30.5 0 55.6-25 55.6-55.8V374.6l18 9.7c13.6 7.3 30.5 2.2 37.8-11.5 7.3-13.6 2.2-30.6-11.4-38L537.9 113.7c-5.8-6.6-14.3-10-22.8-9.5-8.6-0.6-17.1 2.9-22.8 9.5L81.4 334.8c-13.6 7.4-18.7 24.4-11.5 38 7.3 13.6 24.2 18.8 37.8 11.5l14.3-7.7 0.1 484.7z"
                                fill="#5E676F"/>
                            <path
                                d="M178.8 340c0 77 0 389.8-0.2 486 0 17.9 12.5 28.3 29.2 28.3h56c15.6 0 27.1-19.5 27.1-28V461.9c0-31 25.1-56 55.9-56h336.7c30.9 0 55.9 24.9 55.9 56v224.2s-0.1 91.4-0.2 139.5c0 17.1 12.7 28.7 29.6 28.7 17 0 38.2 0 54.9 0.1 16 0 27.8-19.3 27.8-28.1V338L517 158.7 178.8 340z"
                                fill="#FDFEFF"/>
                            <path
                                d="M683.1 440.3c15.6 0 28.2 12.4 28.2 28v28H318.9v-28c0-15.5 12.6-28 28.2-28h336zM318.9 524.4h392.4v56.1H318.9zM318.9 608.4h392.4v56.1H318.9z"
                                fill="#FFFFFF"/>
                        </svg>
                    </div>
                    <div className={styles.sidebarMenu__txt}>
                        Garage
                    </div>
                </div>
                <div className={styles.sidebarMenu__subinfo}>
                    {cars.length} Cars
                </div>
            </Link>

        </div>
    );
};

export default SidebarMenu;