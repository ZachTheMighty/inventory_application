const db = require("../db/queries.js");

const categoriesListGet = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories.ejs", { categories });
};

module.exports = {
  categoriesListGet,
};
