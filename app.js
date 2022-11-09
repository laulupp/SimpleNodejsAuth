const express = require("express");
const path = require("path");
const app = express();

const routerIndex = require("./routes/index");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 80);

app.use("/", routerIndex);

app.listen(app.get("port"), () => {
  console.log("Started on port " + app.get("port"));
});
