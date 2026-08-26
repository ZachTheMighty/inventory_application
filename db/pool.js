const { Pool } = require("pg");
const { loadEnvFile } = require("node:process");
loadEnvFile();

const ENV = process.env;

module.exports = new Pool({
  connectionString: `postgresql://${ENV.USER}:${ENV.PASSWORD}@${ENV.HOST}:${ENV.DATABASE_SERVER_PORT}/${ENV.DATABASE}`,
});
