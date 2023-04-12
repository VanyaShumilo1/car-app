

export const countOutgoings = (outgoings) => {
    let x = 0;

    outgoings.forEach(item => {
        x += item.price
    })

    return x
}
export const createOutgoingsArrays = (outgoings) => {
    const mp = {}

    for(let i = 0; i < outgoings.length; i++) {

        if (!mp[outgoings[i].type]) {
            mp[outgoings[i].type] = Number(outgoings[i].price)
        } else {
            mp[outgoings[i].type] += Number(outgoings[i].price)
        }

    }

    const keys = Object.keys(mp)
    const values = Object.values(mp)

    return [Object.keys(mp), Object.values(mp)]

}
