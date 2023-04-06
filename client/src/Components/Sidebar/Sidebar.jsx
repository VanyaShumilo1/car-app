import React from 'react';
import styles from '../../styles/Sidebar.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/slices/auth.js";
import SimpleButton from "../UI/SimpleButton.jsx";
import {logoutCar} from "../../redux/slices/car.js";

const Sidebar = ({sidebar, setSidebar}) => {

    const car = useSelector((state) => state.car.cars.items)
    const user = useSelector((state) => state.auth.data)
    const dispatch = useDispatch()

    const handleSidebar = () => {
        setSidebar(
            sidebar === ''
                ? 'active'
                : ''
        )
    }

    const onClickLogout = () => {
        dispatch(logout())
        dispatch(logoutCar())
    };


    return (
        <div className={[styles.sidebar, sidebar && styles.active].join(' ')}>
            <header className={styles.header}>
                <div>
                    <button className={styles.button} onClick={handleSidebar}>
                        <svg fill="#fff" height="30px" width="30px" version="1.1" id="Layer_1"
                             xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                             viewBox="0 0 492 492" xmlSpace="preserve">
                            <g>
                                <g>
                                    <path d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
                                        c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
                                        L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
                                        c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
                                        c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
                                        C492,219.198,479.172,207.418,464.344,207.418z"/>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.email}>
                        {user?.email}
                    </div>
                    <div className={styles.cars}>
                        Cars: {car?.length}
                    </div>
                </div>
                <div>
                    <SimpleButton onClick={onClickLogout}>Logout</SimpleButton>
                </div>

            </header>

            <div className={styles.body}>
                <div>
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
            </div>

        </div>

    );
};

export default Sidebar;