const { Router } = require("express");
const Lobby = require("../Lobby/model");
const Sse = require("json-sse");
const stream = new Sse();
const router = new Router();
const auth = require("../User/authMiddleware");
const { toJWT, toData } = require("../User/jwt");

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
  console.log("got a request on lobby", request.body);
  console.log("header", request.headers.authorization);
  const auth =
    request.headers.authorization && request.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    const tempId = toData(auth[1]);
    console.log("userId", tempId.userId);
    const entity = await Lobby.findByPk(request.params.id);
    console.log("checking entity", entity);
    //const { id, player1, player2, status } = JSON.stringify(entity)
    const { id, player1, player2, status } = entity.dataValues;
    console.log("checking values", id, player1, player2, status);
    if (status === "Waiting for players") {
      Lobby.update( { player1: tempId.userId, status: "Waiting for player2" },{
          where: {
            id: request.params.id
          }
        }
      );
    }
    if (status === "Waiting for player2" && player1!==null) {
        Lobby.update( { player2: tempId.userId, status: "full" },{
            where: {
              id: request.params.id
            }
          }
        );
      }
    }
    const lobby = Lobby.findAll();
    const data = JSON.stringify(lobby);
    stream.send(data);
    response.status('Join OK');
    response.send("Thanks for joining the  lobby");
  })


module.exports = router;
