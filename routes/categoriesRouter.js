const { Router } = require("express");

const categoriesRouter = Router();

const categoriesController = require("../controllers/categoriesController.js");

categoriesRouter.get("/", categoriesController.categoriesListGet);
categoriesRouter.get(
  "/category/:categoryName",
  categoriesController.instrumentsListGet,
);

categoriesRouter.get("/new_category", categoriesController.categoriesCreateGet);

categoriesRouter.post(
  "/new_category",
  categoriesController.categoriesCreatePost,
);

module.exports = categoriesRouter;
