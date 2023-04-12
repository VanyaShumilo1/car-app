import React from 'react';
import styles from '../../styles/MyContainer.module.scss'

const MyContainer = ({children, ...props}) => {
    return (
        <div {...props} className={styles.myContainer}>
            {children}
        </div>
    );
};

export default MyContainer;