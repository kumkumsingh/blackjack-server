const Hand = require('./model')
const {Router} = require('express')
const random = require('../random')

const router = new Router()

router.put('/:id', (req,res,next) => {
    
    Hand.findByPk(req.params.id)
        .then(handOfCards => {
            console.log("hand", handOfCards)
            if(handOfCards){
                if(handOfCards.c3 === null){
                    return handOfCards.update({
                        c3: random()
                    })
                     .then(handOfCards => res.send(handOfCards));
                }else if(handOfCards.c4 === null){
                    return handOfCards.update({
                        c4: random()
                    })
                    .then(handOfCards => res.send(handOfCards))
                } else if(handOfCards.c5 === null){
                    return handOfCards.update({
                        c5: random()
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
