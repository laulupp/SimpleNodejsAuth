const express = require("express");
const app = express();

const port = 80;

app.set("view-engine", "ejs");
app.set("views", __dirname + "/views");
app.set("port", process.env.PORT || port);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(app.get("port"), () => {
  console.log("Started on port " + app.get("port"));
});
