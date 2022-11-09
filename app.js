const express = require("express");
const app = express();

const port = 80;

app.set("view-engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log("Started on port " + port);
});
