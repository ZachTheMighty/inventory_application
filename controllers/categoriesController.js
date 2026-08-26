const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries.js");

const categoriesListGet = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories.ejs", { categories });
};

const categoriesCreateGet = async (req, res) => {
  res.render("createCategory.ejs", { added: false, errors: [] });
};

const validateCategory = [
  body("categoryName")
    .trim()
    .notEmpty()
    .withMessage("field can't be empty")
    .isLength({ max: 20 })
    .withMessage("name can't be over 20 chars"),
];

const categoriesCreatePost = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .render("createCategory.ejs", { added: false, errors });

    await db.insertCategory(matchedData(req).categoryName);
    res.render("createCategory.ejs", { added: true, errors: [] });
  },
];

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
