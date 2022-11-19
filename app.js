require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const router = require("./routes/routes");
const configPassport = require("./auth/configPassport");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true
});
configPassport();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 80);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(session({
  secret: process.env.SECRET_PHRASE,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);

app.listen(app.get("port"), () => {
  console.log("Started on port " + app.get("port"));
});
