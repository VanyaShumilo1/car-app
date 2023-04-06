import React from 'react';
import styles from '../styles/OutgoingsList.module.scss'
import OutgoingsListItem from "./OutgoingsListItem.jsx";

const OutgoingsList = ({outgoings, ...props}) => {
    return (
        <div className={styles.OutgoingsList}>
            {
                outgoings && outgoings.map(outgoing => {
                    return <OutgoingsListItem key={outgoing._id} outgoing={outgoing}/>
                })
            }
        </div>
    );
};

export default OutgoingsList;