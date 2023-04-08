import React from 'react';
import styles from '../styles/OutgoingsList.module.scss'
import OutgoingsListItem from "./OutgoingsListItem.jsx";
import Title from './UI/Title.jsx'

const OutgoingsList = ({outgoings, ...props}) => {
    return (
        <div className={styles.OutgoingsList}>

            {
                outgoings.length > 0
                    ? outgoings.map(outgoing =>  (<OutgoingsListItem key={outgoing._id} outgoing={outgoing}/>))
                    : <Title>No outgoings</Title>
            }
        </div>
    );
};

export default OutgoingsList;