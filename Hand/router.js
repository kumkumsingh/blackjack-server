const Hand = require('./model')
const {Router} = require('express')
const random = require('../random')

const router = new Router()

const c3Column = random()
const c4Column = random()
const c5Column = random()

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
