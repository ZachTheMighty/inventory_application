const { loadEnvFile } = require("node:process");
loadEnvFile();

const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("niggar"));

app.listen(process.env.NODE_SERVER_PORT, (error) => {
  if (error) throw error;
  console.log(`listening on PORT ${process.env.NODE_SERVER_PORT}`);
});
