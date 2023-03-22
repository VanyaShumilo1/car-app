import React from 'react';
import styles from '../../styles/Button.module.scss'

const Button = ({children, ...props}) => {
    return (
        <button {...props} className={[styles.button, props.className].join(' ')}>
            {children}
        </button>
    );
};

export default Button;