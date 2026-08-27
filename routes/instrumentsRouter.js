const { Router } = require("express");
const instrumentsController = require("../controllers/instrumentsController.js");

const instrumentsRouter = Router();

instrumentsRouter.get("/new", instrumentsController.instrumentCreateGet);
instrumentsRouter.post("/new", instrumentsController.instrumentCreatePost);

instrumentsRouter.get(
  "/delete/:instrumentName",
  instrumentsController.instrumentDelete,
);

module.exports = instrumentsRouter;
