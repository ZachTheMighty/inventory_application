const { loadEnvFile } = require("node:process");
const express = require("express");
const path = require("node:path");

try {
  loadEnvFile();
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const app = express();

const categoriesRouter = require("./routes/categoriesRouter.js");
const instrumentsRouter = require("./routes/instrumentsRouter.js");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.send("<a href='/category'>Browse our catalogue</a>"),
);
app.use("/category", categoriesRouter);
app.use("/instrument", instrumentsRouter);

app.use((req, res) => {
  res.status(404).send("page doesn't exist you dumb bitch");
});

app.listen(process.env.NODE_SERVER_PORT, (error) => {
  if (error) throw error;
  console.log(`listening on PORT ${process.env.NODE_SERVER_PORT}`);
});
