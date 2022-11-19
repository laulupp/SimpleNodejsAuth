const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use("login", new localStrategy(function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "The username is not correct." });
            }
            bcrypt.compare(password, user.password, function (err, res) {
                if (err) {
                    return done(err);
                }
                if (res === false) {
                    return done(null, false, { message: "The password is not correct."});
                }

                return done(null, user);
            })
        })
    }))
}