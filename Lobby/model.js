const Sequelize = require('sequelize')
const db = require('../db')
const Lobby = db.define('Lobby',{

    roomName : {
        
        type: Sequelize.STRING,

    },
    player1 : {
        type: Sequelize.INTEGER,
    },
    player2 : {
      
        type: Sequelize.INTEGER,
    },
    hand1_Id :{
        type: Sequelize.STRING,
       
    },
    hand2_Id :{
        type: Sequelize.STRING,
    },
    winner :{
        type: Sequelize.STRING,
       
    },
    status : {
        type: Sequelize.STRING
    }

})
//Hand.belongsTo(Lobby)
//Room.hasMany(Hand)
module.exports = Lobby