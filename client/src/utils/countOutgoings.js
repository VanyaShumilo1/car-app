import axios from "axios";


export const countOutgoings = (outgoings) => {
    let x = 0;

    outgoings.forEach(item => {
        x += item.price
    })

    return x
}

const currencies = async (outgoings, currentCurrency) => {
    const mp = {
        "USD-UAH": 36.7,
        "UAH-UAH": 1,
        "UAH-USD": 0.02,
        "UAH-EUR": 0.02,
        "USD-EUR": 0.9,
        "USD-USD": 1,
    }
    console.log(currentCurrency)
    // for (let i = 0; i < outgoings.length; i++) {
    //     const outgoingCurrency = outgoings[i].currency
    //     if (currentCurrency === outgoingCurrency) {
    //         mp[`${currentCurrency}-${outgoingCurrency}`] = 1
    //     }
    //     else if (!mp[outgoings[i][`${outgoings[i].currency}-${currentCurrency}`]]) {
    //         const price = await axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=${currentCurrency}&from=${outgoingCurrency}&amount=${1}`, {
    //             headers: {
    //                 apikey: "dor1RkO39FLAx5Uh0ebEGHCPEITSMJTe"
    //             }
    //         })
    //
    //         mp[`${outgoings[i].currency}-${currentCurrency}`] = price.data.result.toFixed(2)
    //     }
    // }
    console.log(mp)
    return mp
}

export const createOutgoingsArraysWithExchange = async (outgoings, currentCurrency) => {
    const currenciesObj = await currencies(outgoings, currentCurrency)
    let mp = {}

    for (let i = 0; i < outgoings.length; i++) {
        if (!mp[outgoings[i].type]) {
            mp[outgoings[i].type] = Number(outgoings[i].price * currenciesObj[`${outgoings[i].currency}-${currentCurrency}`])
        } else {
            mp[outgoings[i].type] += Number(outgoings[i].price * currenciesObj[`${outgoings[i].currency}-${currentCurrency}`])
        }
    }

    //console.log(mp)
    return mp
}
