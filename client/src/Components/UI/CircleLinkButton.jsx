import React from 'react';
import {Link} from "react-router-dom";
import styles from '../../styles/CircleLinkButton.module.scss'

const CircleLinkButton = ({children, ...props}) => {
    return (
        <Link {...props} className={[styles.circleLinkButton, props.className].join(' ')}>
            {children}
        </Link>
    );
};

export default CircleLinkButton;