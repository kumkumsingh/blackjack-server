const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
})

module.exports = User;