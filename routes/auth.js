const express = require("express");
const authCheck = require("../auth/authCheck");
var passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = function (router) {
    router.get("/login", authCheck.isNotLogged, (req, res) => {
        res.render("login", { message: req.flash("error") });
    });

    router.post("/login", passport.authenticate("login", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }))

    router.get("/logout", authCheck.isLogged, (req, res, next) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/login');
        });
    });

    router.get("/register", authCheck.isNotLogged, function (req, res) {
        res.render("register", { message: req.flash("message") });
    });

    router.post("/register", function (req, res, next) {
        if (req.body.username.length === 0) {
            req.flash("message", "Invalid username");
            res.redirect("/register");
        }
        if (req.body.password.length === 0) {
            req.flash("message", "Invalid password");
            res.redirect("/register");
        }
        if (req.body.password2.length === 0) {
            req.flash("message", "Please retype the password");
            res.redirect("/register");
        }
        if (req.body.name.length === 0) {
            req.flash("message", "Invalid name");
            res.redirect("/register");
        }

        User.findOne({ username: req.body.username }, function (err, user) {
            if (err) { return next(err); }
            if (user) {
                req.flash("message", "The username already exists");
                return res.redirect("/register");
            }
            if (req.body.password != req.body.password2) {
                req.flash("message", "The passwords do not match");
                return res.redirect("/register");
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
                        name: req.body.name
                    });
                    newUser.save(next);
                    console.log("registered!");
                });
            });
        });
    }, passport.authenticate("login", {
        successRedirect: "/",
        failureRedirect: "/register",
        failureFlash: true
    }));
}