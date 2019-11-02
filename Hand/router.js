const Hand = require('./model')
const {Router} = require('express')
const random = require('../random')

const router = new Router()

const c3Column = random()
const c4Column = random()
const c5Column = random()

router.post('/newgame', (req,res,next) => {

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
    const result =  Promise.all(playerPromises)
    return res.status(200).send(result)
    .catch(next)
})

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