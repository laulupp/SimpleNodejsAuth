const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const routerIndex = require("./routes/index");

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true} );

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 80);

app.use(express.static(__dirname + '/public'));
app.use("/", routerIndex);

app.listen(app.get("port"), () => {
  console.log("Started on port " + app.get("port"));
});
