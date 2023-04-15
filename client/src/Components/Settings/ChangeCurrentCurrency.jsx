import React, {useState} from 'react';
import styles from '../../styles/ChangeCurrentCurrency.module.scss'
import {currencies} from "../../utils/currencies.js";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentCurrency} from "../../redux/slices/car.js";


const ChangeCurrentCurrency = () => {

    const dispatch = useDispatch()
    const currentCurrency = useSelector(state => state.car.currentCurrency)
    const [value, setValue] = useState(currentCurrency)

    const handleChange = (e) =>  {
        dispatch(changeCurrentCurrency(e.target.value))
    }

    return (
        <div className={styles.changeCurrentCurrency}>
            <select name="currency" id="currency" onChange={handleChange}>
                {
                    currencies.map(item => <option selected={item===currentCurrency}  key={item} value={item}>{item}</option>)
                }
            </select>
        </div>
    );
};

export default ChangeCurrentCurrency;