const Sequelize = require('sequelize')
const db = require('../db')

const Hand = db.define('hand', {
    c1: {
        type: Sequelize.STRING
    },
    c2: {
        type: Sequelize.STRING
    },
    c3: {
        type: Sequelize.STRING,
        allownull: false
    },
    c4: {
        type: Sequelize.STRING,
        allownull: false
    },
    c5: {
        type: Sequelize.STRING,
        allownull: false
    }
})

module.exports = Hand;