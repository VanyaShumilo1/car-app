import React from 'react';
import styles from '../styles/OutgoingsList.module.scss'
import OutgoingsListItem from "./OutgoingsListItem.jsx";

const OutgoingsList = () => {
    return (
        <div className={styles.OutgoingsList}>
            <OutgoingsListItem/>
            <OutgoingsListItem/>
            <OutgoingsListItem/>
            <OutgoingsListItem/>
            <OutgoingsListItem/>
            <OutgoingsListItem/>
            <OutgoingsListItem/>
            <OutgoingsListItem/>
            <OutgoingsListItem/>
        </div>
    );
};

export default OutgoingsList;