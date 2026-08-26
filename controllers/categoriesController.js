const db = require("../db/queries.js");

const categoriesListGet = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories.ejs", { categories });
};

const categoriesCreateGet = async (req, res) => {
  res.render("createCategory.ejs", { added: false });
};

const categoriesCreatePost = async (req, res) => {
  await db.insertCategory(req.body.categoryName);
  res.render("createCategory.ejs", { added: true });
};

const instrumentsListGet = async (req, res) => {
  const instruments = await db.getInstruments(req.params.categoryName);
  res.render("instruments.ejs", {
    instruments,
    categoryName: req.params.categoryName,
  });
};

module.exports = {
  categoriesListGet,
  categoriesCreateGet,
  categoriesCreatePost,
  instrumentsListGet,
};
