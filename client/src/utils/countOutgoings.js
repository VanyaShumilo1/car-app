import axios from "axios";
import {logoutCar} from "../redux/slices/car.js";


export const countOutgoings = (outgoings) => {
    let x = 0;

    outgoings.forEach(item => {
        x += item.price
    })

    return x
}

const currencies = async (outgoings) => {
    const mp = {
        'UAH-UAH': 1,
        'USD-UAH': 36.742362
    }
    const currentCurrency = "UAH"
    // for (let i = 0; i < outgoings.length; i++) {
    //
    //     if (!mp[outgoings[i][`${outgoings[i].currency}-${currentCurrency}`]]) {
    //         const outgoingCurrency = outgoings[i].currency
    //
    //         const price = await axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=${currentCurrency}&from=${outgoingCurrency}&amount=${1}`, {
    //             headers: {
    //                 apikey: "dor1RkO39FLAx5Uh0ebEGHCPEITSMJTe"
    //             }
    //         })
    //
    //         mp[`${outgoings[i].currency}-${currentCurrency}`] = price.data.result
    //     }
    // }
    console.log(mp)
    return mp
}

export const createOutgoingsArraysWithExchange = async (outgoings) => {
    const currenciesObj = await currencies(outgoings)
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

export const createOutgoingsArrays = (outgoings) => {
    let mp = {}
    //console.log(createOutgoingsArraysWithExchange(outgoings))
    currencies(outgoings).then(data => {

        for (let i = 0; i < outgoings.length; i++) {
            if (!mp[outgoings[i].type]) {
                mp[outgoings[i].type] = Number(outgoings[i].price * data[`${outgoings[i].currency}-UAH`])
            } else {
                mp[outgoings[i].type] += Number(outgoings[i].price * data[`${outgoings[i].currency}-UAH`])
            }
        }

        //console.log(mp)
        return mp
    })

    for (let i = 0; i < outgoings.length; i++) {
        if (!mp[outgoings[i].type]) {
            mp[outgoings[i].type] = Number(outgoings[i].price)
        } else {
            mp[outgoings[i].type] += Number(outgoings[i].price)
        }
    }


    const keys = Object.keys(mp)
    const values = Object.values(mp)
    //console.log(mp)
    return [Object.keys(mp), Object.values(mp)]

}