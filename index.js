const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./User/router')
//const lobbyModel = require('./Lobby/model')
const lobbyRouter = require('./Lobby/router')
const handRouter = require('./Hand/router')
const Hand = require('./Hand/model')
const random = require('./random')
const db = require('./db')

const app = express()

const corsMiddleware = cors()
app.use(corsMiddleware)

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

app.use(userRouter)
app.use(lobbyRouter)
app.use(handRouter)

port = 4000;
app.listen(port, () => console.log(`Listening to port ${port}`))

db
    .sync({force:true})
    .then(() => console.log("Database connected"))
    .then(() => {

        const row1C1 = random() 
        const row1C2 = random()
        const row2C1 = random()
        const row2C2 = random()

        const players = [
            {c1: row1C1[0], c2: row1C2[0], score: row1C1[1] + row1C2[1]},
            {c1: row2C1[0], c2: row2C2[0], score: row2C1[1] + row2C2[1]}
        ]

        const playerPromises = players.map(player => {
            
            return Hand.create(player)
        })
        return Promise.all(playerPromises)

    })
    .catch(console.error)