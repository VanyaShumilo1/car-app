import React from 'react';
import styles from '../../styles/Title.module.scss'


const Title = ({children, ...props}) => {
    return (
        <h1 {...props} className={[props.className, styles.title].join(' ')}>
            {children}
        </h1>
    );
};

export default Title;