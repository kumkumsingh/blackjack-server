const { Router } = require("express");
const Lobby = require("./model");
const Sse = require("json-sse");
const stream = new Sse();
const router = new Router();
const auth = require("../User/authMiddleware");
const User = require('../User/model')
const Hand = require('../Hand/model')


router.get("/lobby", async (request, response) => {
    console.log("got a request on /stream");
    const room = await Lobby.findAll({
        include: [
            {
                model: User,
                include: [
                    { model: Hand }
                ]
            }
        ]
    });
    response.send(room)
});

router.post("/lobby", async (request, response) => {
    const roomName = request.body.roomName;
    const entity = await Lobby.create({
        roomName,
        status: "Waiting for players"
    });
                      
    response.status(200).send(entity);
});



//if user wants to join specific room
router.put('/game/:roomId', auth, async (request, response, next) => {
    try {
        // console.log("checking id..", req.params.roomId)
        const room = request.params.roomId
        const lobby = await Lobby.findByPk(room)
        // console.log("req.user is", request.user)
        // console.log("request body of lobby table", lobby.dataValues.id, "status", lobby.dataValues.status)
        //updating user LobbyId column based on whcih room he wants to join
        const updated = await request.user.update({ LobbyId: room })
        const status = lobby.dataValues.status
        // console.log("status check", status)

        if(status==="Waiting for players"){
            Lobby.update({
                status: "waiting for player2"
            },{
                where: {
                    id: request.params.roomId
                }
            })
            Hand.create({
                userId: request.user.id
            })
        } else if(status==="waiting for player2"){
            Lobby.update({
                status: "Its full"
            },{
                where: {
                    id: request.params.roomId
                }
            })
            Hand.create({
                userId: request.user.id
            })
        } else {
            response.status(400).end("Please create another room")
        }

        response.send(updated)
    } catch(error) {

        next(error)
    }
})

//testing purpose
router.get('/test/:roomId', (req, res, next) => {
    Lobby.findByPk(req.params.roomId,
        {
            include: [
                {
                    model: User,
                    include: [
                        { model: Hand }
                    ]
                }
            ]
        })
        .then(result => {
            res.send(result)
        })
});
module.exports = router;

// database query result
// get details of room
// Result:

// const lobby = {
//     id: 2,
//     roomName: 'test',
//     (users): [
//         {
//             id: 1,
//             username: "test name",
//             hand: {
//                  c1: 1,
//                  c2: etc
//             }
//         }
//         ,{
//             id: 2,
//             username: "test name",
//             hand: {
//                  c1: 1,
//                  c2: etc
//             }
//         }
//     ]
// }