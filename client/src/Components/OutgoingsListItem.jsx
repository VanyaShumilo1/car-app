import React from 'react';
import styles from '../styles/OutgoingsListItem.module.scss'

const OutgoingsListItem = ({outgoing, ...props}) => {
    return (
        <div className={styles.OutgoingListItem}>

            <div className={styles.wrapper}>
                <div className={styles.type}>{outgoing.type}</div>
                <div className={styles.price}>
                    {outgoing.price} {outgoing.currency}
                </div>
            </div>


            <div>
                <div className={styles.description}>{outgoing.description}</div>
                <div className={styles.date}>{new Date(outgoing?.createdAt).toLocaleString().split(',')[0]}</div>
            </div>


        </div>
    );
};

export default OutgoingsListItem;