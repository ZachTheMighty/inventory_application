const pool = require("./pool.js");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function insertCategory(category) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [category]);
}

async function deleteCategory(category) {
  const { rows } = await pool.query(
    "SELECT id FROM categories WHERE category = ($1)",
    [category],
  );
  await pool.query(
    `UPDATE instruments SET category_id = 1 WHERE category_id = ${rows[0].id}`,
  );

  await pool.query("DELETE FROM categories WHERE category = ($1)", [category]);
}

async function updateCategory(oldName, newName) {
  await pool.query(
    "UPDATE categories SET category = ($2) WHERE category = ($1)",
    [oldName, newName],
  );
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

async function insertInstrument(instrument, category) {
  const { rows } = await pool.query(
    "SELECT id FROM categories WHERE category = ($1)",
    [category],
  );
  await pool.query(
    "INSERT INTO instruments (instrument, category_id) VALUES ($1, $2)",
    [instrument, rows[0].id],
  );
}

async function deleteInstrument(instrument) {
  await pool.query("DELETE FROM instruments WHERE instrument = ($1)", [
    instrument,
  ]);
}

module.exports = {
  getAllCategories,
  insertCategory,
  deleteCategory,
  updateCategory,
  getInstruments,
  insertInstrument,
  deleteInstrument,
};
