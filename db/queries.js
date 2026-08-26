const pool = require("./pool.js");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function insertCategory(category) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [category]);
}

async function getInstruments(category) {
  const categoryExists = await pool.query(
    "SELECT * FROM categories WHERE category = ($1)",
    [category],
  );
  if (categoryExists.rows.length === 0)
    throw new Error("Category does not exist");

  const { rows } = await pool.query(
    "SELECT instrument, category FROM instruments INNER JOIN categories ON instruments.category_id = categories.id WHERE category = ($1)",
    [category],
  );
  return rows;
}

module.exports = {
  getAllCategories,
  insertCategory,
  getInstruments,
};
