const { Router } = require("express");
const Lobby = require("../Lobby/model");
const Sse = require("json-sse");
const stream = new Sse();
const router = new Router();
const auth = require("../User/authMiddleware");
const { toJWT, toData } = require("../User/jwt");
const User = require("../User/model");
const Hand = require("../Hand/model");

router.get("/stream", async (request, response) => {
  console.log("got a request on /stream");
  const room = await Lobby.findAll();
  const data = JSON.stringify(room);
  console.log("stringified data", data);
  stream.updateInit(data); // here i put the data in the stream
  stream.init(request, response); //this is important !!!
});

router.post("/lobby", async (request, response) => {
  const roomName = request.body.roomName;
  const entity = await Lobby.create({
    roomName,
    status: "Waiting for players"
  });
  const lobby = Lobby.findAll();
  const data = JSON.stringify(lobby);
  stream.send(data);
  response.status(201);
  response.send("Thanks for creating lobby");
});

router.put("/lobby/:id", auth, async (request, response) => {
  const entity = await Lobby.findByPk(request.params.id, {
    include: [
      {
        model: User,
        include: [{ model: Hand }]
      }
    ]
  })
    .then(result => {
      console.log("checking entity", result);
      const { id, status } = result.dataValues;
      console.log("checking values", id, status);
      if (status === "Waiting for players") {
        Lobby.update(
          { status: "Waiting for player2" },
          {
            where: {
              id: request.params.id
            }
          }
        )
      } else if (status === "Waiting for player2") {
        Lobby.update(
          { status: "full" },
          {
            where: {
              id: request.params.id
            }
          }
        )
      } else if (status === "full") {
        response.send("Please create another lobby");
      }
    })

});

router.put("/game/join/:roomId", auth, async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const lobby = await Lobby.findByPk(req.params.id);

    const updated = await req.user.update({ LobbyId: roomId });

    res.send(updated);
  } catch (error) {
    next(error);
  }
});

router.get("/test/:roomId", (req, res, next) => {
  Lobby.findByPk(req.params.roomId, {
    include: [
      {
        model: User,
        include: [{ model: Hand }]
      }
    ]
  }).then(result => {
    res.send(result);
  });
});
module.exports = router;

// database query result
// get details of room
// Result:

// const lobby = {
//     id: 1,
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
