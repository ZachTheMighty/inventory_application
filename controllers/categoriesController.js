const db = require("../db/queries.js");

const categoriesListGet = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories.ejs", { categories });
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
  instrumentsListGet,
};
