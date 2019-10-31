const Sequelize = require('sequelize')
const db = require('../db')
const Lobby =require('../Lobby/model')
const Hand = require('../Hand/model')

const User = db.define('user', {

    username: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
User.belongsTo(Lobby)
User.hasOne(Hand)
Hand.belongsTo(User)
Lobby.hasMany(User)

module.exports = User;