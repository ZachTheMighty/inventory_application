const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category VARCHAR (255)
);

INSERT INTO categories (category)
VALUES
('String'),
('Woodwind'),
('Brass');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
