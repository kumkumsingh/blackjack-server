const Sequelize = require('sequelize')
const db = require('../db')
const Hand = require('../Hand/model')
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

})
// Hand.belongsTo(Lobby, { as: 'hand1', constraints: false })
// Hand.belongsTo(Lobby, { as: 'hand2', constraints: false })

module.exports = Lobby