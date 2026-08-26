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
('Brass'),
('Uncategorized');

CREATE TABLE IF NOT EXISTS instruments (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  instrument VARCHAR (255),
  category_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO instruments (instrument, category_id)
VALUES
('Trumpet', 3),
('Violin', 1),
('Flute', 2),
('Cello', 1)
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
