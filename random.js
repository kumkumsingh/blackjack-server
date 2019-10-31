
module.exports = () => {
    const suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
    const values = [1,2,3,4,5,6,7,8,9,10,11];

    const randomSuit = suits[Math.trunc(Math.random() * suits.length)].split('')[0]
    const randomValue = values[Math.trunc(Math.random()* values.length)]

    return [`${randomSuit}${randomValue}`, randomValue] //we get a string eg: "5H", "4C"
}
