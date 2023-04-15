const countDays = (startDate) => {
    let start = new Date(startDate);
    let now = Date.now();
    return Math.ceil(Math.abs(now - start.getTime()) / (1000 * 3600 * 24));
}

export const PricePerDay = (startDate, totalPrice) => {
    const days = countDays(startDate)

    return totalPrice / days
}