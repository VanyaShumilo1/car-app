import React from 'react';
import styles from '../../styles/Subtitle.module.scss'


const Subtitle = ({children, ...props}) => {
    return (
        <h2 {...props} className={[styles.subtitle, props.className].join(' ')}>
            {children}
        </h2>
    );
};

export default Subtitle;