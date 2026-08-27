const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries.js");

const instrumentsListGet = async (req, res) => {
  const instruments = await db.getInstruments(req.params.categoryName);
  res.render("instruments.ejs", {
    instruments,
    categoryName: req.params.categoryName,
  });
};

const instrumentCreateGet = (req, res) => {
  res.render("createInstrument.ejs", {
    added: false,
    errors: [],
    categoryName: req.query.category,
  });
};

const validateInstrument = [
  body("instrumentName")
    .trim()
    .notEmpty()
    .withMessage("field can't be empty")
    .isLength({ max: 20 })
    .withMessage("name can't be over 20 chars"),
];

const instrumentCreatePost = [
  validateInstrument,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(404).render("createInstrument.ejs", {
        added: false,
        errors,
        categoryName: req.query.category,
      });

    await db.insertInstrument(req.body.instrumentName, req.query.category);
    res.render("createInstrument.ejs", {
      added: true,
      errors: [],
      categoryName: req.query.category,
    });
  },
];

const instrumentDelete = async (req, res) => {
  await db.deleteInstrument(req.params.instrumentName);
  res.send("Instrument successfully deleted <a href='/'>back home</a>");
};

const instrumentUpdateGet = async (req, res) => {
  res.render("updateInstrument.ejs", {
    updated: false,
    instrumentName: req.params.instrumentName,
    categoryName: req.query.category,
    categories: await db.getAllCategories(),
    errors: [],
  });
};

const instrumentUpdatePost = [
  validateInstrument,
  async (req, res) => {
    console.log(req.body.categoryName);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).render("updateInstrument.ejs", {
        updated: false,
        instrumentName: req.params.instrumentName,
        categories: await db.getAllCategories(),
        errors,
      });

    await db.updateInstrument(
      req.params.instrumentName,
      req.body.instrumentName,
      req.body.categoryName,
    );
    res.render("updateInstrument.ejs", {
      updated: true,
      instrumentName: req.params.instrumentName,
      categories: await db.getAllCategories(),
      errors: [],
    });
  },
];

module.exports = {
  instrumentsListGet,
  instrumentCreateGet,
  instrumentCreatePost,
  instrumentDelete,
  instrumentUpdateGet,
  instrumentUpdatePost,
};
