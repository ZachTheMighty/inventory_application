const { Router } = require("express");

const categoriesRouter = Router();

const categoriesController = require("../controllers/categoriesController.js");
const instrumentsController = require("../controllers/instrumentsController.js");

categoriesRouter.get("/", categoriesController.categoriesListGet);
categoriesRouter.get("/new", categoriesController.categoriesCreateGet);

categoriesRouter.get(
  "/:categoryName",
  instrumentsController.instrumentsListGet,
);

categoriesRouter.post("/new", categoriesController.categoriesCreatePost);

categoriesRouter.get("/delete/Uncategorized", (req, res) =>
  res.send("You cant delete this shit smartass"),
);

categoriesRouter.get(
  "/delete/:categoryName",
  categoriesController.categoriesDelete,
);

categoriesRouter.get(
  "/update/:categoryName",
  categoriesController.categoriesUpdateGet,
);

categoriesRouter.post(
  "/update/:categoryName",
  categoriesController.categoriesUpdatePost,
);

module.exports = categoriesRouter;
