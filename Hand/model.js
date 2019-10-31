const Sequelize = require('sequelize')
const db = require('../db')
const User = require('../User/model')

const Hand = db.define('hand', {
    c1: {
        type: Sequelize.STRING,
        allownull: false
    },
    c2: {
        type: Sequelize.STRING,
        allownull: false
    },
    c3: {
        type: Sequelize.STRING
    },
    c4: {
        type: Sequelize.STRING
    },
    c5: {
        type: Sequelize.STRING
    },
    score: {
        type: Sequelize.INTEGER,
        allownull: false
    }
})
module.exports = Hand;