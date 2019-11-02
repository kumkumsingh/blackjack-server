const Hand = require('./model')
const {Router} = require('express')
const random = require('../random')
const Sse = require('json-sse')
const stream = new Sse()
const auth = require('../User/authMiddleware')

const router = new Router()

const c3Column = random()
const c4Column = random()
const c5Column = random()

//get two cards for both the players when they start a game
router.post('/newgame',auth, async (request,response,next) => {

        const row1C1 = random()
        const row1C2 = random()
        const row2C1 = random()
        const row2C2 = random()

        const players = [
            {c1: row1C1[0], c2: row1C2[0], score: row1C1[1] + row1C2[1]},
            {c1: row2C1[0], c2: row2C2[0], score: row2C1[1] + row2C2[1]}
        ]

        await Hand.findOne({
            where:{
                userId: request.user.id
            }
        })
        .then(hand => {
            hand.update(players[1])
            response.status(200).send(hand)
        })

        await Hand.findOne({
            where:{
                c1:null
            }
        })
        .then(hand => {
            hand.update(players[0])
            response.status(200).send(hand)
        })
        
        // const playerPromises = players.map(player => {
            
        //     return Hand.update(player)
        // })
        // const result = await Promise.all(playerPromises)

        // console.log("checking userId in hand", request.user)
        console.log("auth user is...", request.params)
        //response.status(200).send()
        
})

//get next card
router.put('/:id', (req,res,next) => {
    
    Hand.findByPk(req.params.id)
        .then(handOfCards => {
            // console.log("hand", handOfCards)
            if(handOfCards){
                if(handOfCards.c3 === null){
                     const score = handOfCards.score + c3Column[1]
                    return handOfCards.update({
                        c3: c3Column[0],
                        score
                    })
                    .then(handOfCards => res.send(handOfCards))
                     
                }else if(handOfCards.c4 === null){
                    const score = handOfCards.score + c4Column[1]
                    return handOfCards.update({
                        c4: c4Column[0],
                        score
                    })
                    .then(handOfCards => res.send(handOfCards))
                } else if(handOfCards.c5 === null){
                    const score = handOfCards.score + c5Column[1]
                    return handOfCards.update({
                        c5: c5Column[0],
                        score
                    })
                    .then(handOfCards => res.send(handOfCards))
                } else {
                    return res.status(400).end()
                }      
            } else {
                return res.status(400).end()
            }
        })
        .catch(next)
})

module.exports = router
