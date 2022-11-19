const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
    console.log(req.body.username + " " + req.body.password);
    res.render("login");
})
module.exports = router;
