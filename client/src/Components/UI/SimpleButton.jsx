import React from 'react';
import styles from '../../styles/SimpleButton.module.scss'
const SimpleButton = ({children, ...props}) => {
    return (
        <button {...props} className={[styles.simpleButton, props.className].join(' ')}>
            {children}
        </button>
    );
};

export default SimpleButton;