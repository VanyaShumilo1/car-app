import React from 'react';
import styles from '../../styles/Input.module.scss'

const Input = ({register, name, rules, ...props}) => {
    return (
        <input
            {...props}
            {...(register && register(name, rules))}
            className={styles.input}
        />
    );
};

export default Input;