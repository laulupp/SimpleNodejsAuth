const express = require("express");
var passport = require("passport");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const authCheck = require("../auth/authCheck");


router.get("/", authCheck.isLogged, (req, res) => {
  res.render("home");
});

router.get("/login", authCheck.isNotLogged, (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login?error=true",
  failureFlash: false
}))

router.get("/register", authCheck.isNotLogged, (req, res) => {
  res.render("register");
});

router.post("/register", function (req, res, next) {


  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) { return next(err); }
    if (user) {
      return res.redirect("/register?error=true");
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        var newUser = new User({
          username: req.body.username,
          password: hash,
        });
        newUser.save(next);
        console.log("registered!");
      });
    });
  });
}, passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/register",
  failureFlash: false
}));

module.exports = router;
