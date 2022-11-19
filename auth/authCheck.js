const { deleteOne } = require("../models/user");

var notLoggedIn = function auth1(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect("/login");
    }
}
var alreadyLoggedIn = function auth2(req, res, next){
    if(!req.isAuthenticated()){
        next();
    } else {
        res.redirect("/");
    }
}

module.exports = {
    isLogged: notLoggedIn,
    isNotLogged: alreadyLoggedIn
}