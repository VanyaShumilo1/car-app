import React from 'react';
import styles from '../../styles/Header.module.scss'
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className={styles.header}>
            <div>
                <svg className={styles.header__burger} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 18L20 18" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
                    <path d="M4 12L20 12" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
                    <path d="M4 6L20 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
            <div className={styles.header__car}>
                <div>Skoda Octavia</div>
                <svg fill="#fff" height="15px" width="15px" version="1.1" id="Layer_1"
                     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                     viewBox="0 0 330 330" xml:space="preserve">
                    <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	                c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	                s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                </svg>
            </div>
            <div>
                <Link to={'/addcar'}>
                    <svg className={styles.header__plus} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"/>
                    </svg>
                </Link>

            </div>
        </div>
    );
};

export default Header;