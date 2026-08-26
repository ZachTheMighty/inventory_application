const categoriesListGet = (req, res) => {
  const categories = ["cat1", "cat2", "cat3"];
  res.render("categories.ejs", { categories });
};

module.exports = {
  categoriesListGet,
};
