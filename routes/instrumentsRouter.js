const { Router } = require("express");
const instrumentsController = require("../controllers/instrumentsController.js");

const instrumentsRouter = Router();

instrumentsRouter.get("/new", instrumentsController.instrumentCreateGet);

instrumentsRouter.post("/new", instrumentsController.instrumentCreatePost);

module.exports = instrumentsRouter;
