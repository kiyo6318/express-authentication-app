const e = require("express");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  var user = req.session.user.name;
  res.render("about", { title: "about", user });
});

module.exports = router;
