import React from 'react';
import styles from '../../styles/Sidebar.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/slices/auth.js";
import SimpleButton from "../UI/SimpleButton.jsx";
import {logoutCar} from "../../redux/slices/car.js";
import SidebarMenu from "./SidebarMenu.jsx";

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

                </div>
                <div>
                    <SimpleButton onClick={onClickLogout}>Logout</SimpleButton>
                </div>

            </header>

            <div className={styles.body}>
                <SidebarMenu />
            </div>

        </div>

    );
};

export default Sidebar;