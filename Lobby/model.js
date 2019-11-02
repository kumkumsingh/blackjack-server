const Sequelize = require('sequelize')
// const Hand = require('../Hand/model')
// const User = require('../User/model')
const db = require('../db')

const Lobby = db.define('Lobby',{
    roomName : {
        type: Sequelize.STRING,
    },
    winner :{
        type: Sequelize.STRING,
    },
    status : {
        type: Sequelize.STRING
    }
}, { timestamps: false })



module.exports = Lobby