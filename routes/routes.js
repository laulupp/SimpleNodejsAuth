const express = require("express");
const router = express.Router();
const authCheck = require("../auth/authCheck");
const authRouter = require("./auth.js");

authRouter(router);

router.get("/", authCheck.isLogged, (req, res) => {
  res.render("home", {
    name: req.user.name,
    level: req.user.level,
    activePage : "Home"
  });
});

module.exports = router;
