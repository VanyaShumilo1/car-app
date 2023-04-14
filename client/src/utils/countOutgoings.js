import axios from "axios";
import {logoutCar} from "../redux/slices/car.js";
import {useSelector} from "react-redux";


export const countOutgoings = (outgoings) => {
    let x = 0;

    outgoings.forEach(item => {
        x += item.price
    })

    return x
}

const currencies = async (outgoings, currentCurrency) => {
    const mp = {}
    //const currentCurrency = "UAH"
    // const currentCurrency = useSelector(state => state.car.currentCurrency)
    console.log(currentCurrency)
    for (let i = 0; i < outgoings.length; i++) {
        const outgoingCurrency = outgoings[i].currency
        if (currentCurrency === outgoingCurrency) {
            mp[`${currentCurrency}-${outgoingCurrency}`] = 1
        }
        else if (!mp[outgoings[i][`${outgoings[i].currency}-${currentCurrency}`]]) {
            const price = await axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=${currentCurrency}&from=${outgoingCurrency}&amount=${1}`, {
                headers: {
                    apikey: "dor1RkO39FLAx5Uh0ebEGHCPEITSMJTe"
                }
            })

            mp[`${outgoings[i].currency}-${currentCurrency}`] = price.data.result.toFixed(1)
        }
    }
    console.log(mp)
    return mp
}

export const createOutgoingsArraysWithExchange = async (outgoings, currentCurrency) => {
    const currenciesObj = await currencies(outgoings, currentCurrency)
    let mp = {}

    for (let i = 0; i < outgoings.length; i++) {
        if (!mp[outgoings[i].type]) {
            mp[outgoings[i].type] = Number(outgoings[i].price * currenciesObj[`${outgoings[i].currency}-UAH`])
        } else {
            mp[outgoings[i].type] += Number(outgoings[i].price * currenciesObj[`${outgoings[i].currency}-UAH`])
        }
    }

    //console.log(mp)
    return mp
}
