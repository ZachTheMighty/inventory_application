const { Router } = require("express");

const categoriesRouter = Router();

const categoriesController = require("../controllers/categoriesController.js");

categoriesRouter.get("/", categoriesController.categoriesListGet);
categoriesRouter.get(
  "/category/:categoryName",
  categoriesController.instrumentsListGet,
);

categoriesRouter.get("/new/category", categoriesController.categoriesCreateGet);

categoriesRouter.post(
  "/new/category",
  categoriesController.categoriesCreatePost,
);

module.exports = categoriesRouter;
