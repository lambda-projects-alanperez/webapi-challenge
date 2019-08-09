const express =require('express');

const server = express();

const actionModel = require('./routers/actions-model');
const projectModel = require ('./routers/project-model')

server.use(express.json());


server.get("/", (req, res, next) => {
    res.send(process.env.TITLE);
  });

server.use("/api/actions", actionModel);
server.use("/api/projects", projectModel);




module.exports = server;


