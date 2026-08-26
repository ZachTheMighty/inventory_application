const { Router } = require("express");

const categoriesRouter = Router();

const categoriesController = require("../controllers/categoriesController.js");

categoriesRouter.get("/", categoriesController.categoriesListGet);
categoriesRouter.get(
  "/category/:categoryName",
  categoriesController.instrumentsListGet,
);

module.exports = categoriesRouter;
