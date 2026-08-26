const { loadEnvFile } = require("node:process");
const express = require("express");
const path = require("node:path");

loadEnvFile();
const app = express();

const categoriesRouter = require("./routes/categoriesRouter.js");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");

app.use("/", categoriesRouter);

app.listen(process.env.NODE_SERVER_PORT, (error) => {
  if (error) throw error;
  console.log(`listening on PORT ${process.env.NODE_SERVER_PORT}`);
});
