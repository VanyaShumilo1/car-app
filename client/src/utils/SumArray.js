export const SumArray = (arr) => {
    let res = 0

    arr.forEach(el => {
        res += el
    })

    return res
}