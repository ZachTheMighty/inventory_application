const pool = require("./pool.js");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

module.exports = {
  getAllCategories,
};
