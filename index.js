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
