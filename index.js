const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./User/router')
//const lobbyModel = require('./Lobby/model')
const lobbyRouter = require('./Lobby/router')

const app = express()

const corsMiddleware = cors()
app.use(corsMiddleware)

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

app.use(userRouter)
app.use(lobbyRouter)

port = 4000;
app.listen(port, () => console.log(`Listening to port ${port}`))