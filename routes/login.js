var express = require("express");
var bcrypt = require("bcrypt");
const db = require("../models");
// var model = require("../models");
// var user = model.user;

var router = express.Router();

router.get("/", function (req, res) {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("login", { err_message: null });
  }
});

router.post("/", async function (req, res) {
  const login_name = req.body.name;

  const { count, rows } = await db.user.findAndCountAll({
    raw: true,
    where: {
      name: login_name,
    },
    offset: 0,
    limit: 1,
  });

  if (count == 0) {
    res.render("login", {
      err_message: "該当するアカウントが存在しません",
    });
  } else {
    var row = rows[0];
    if (bcrypt.compareSync(req.body.password, row.password)) {
      req.session.user = { id: row.id, name: row.name };
      res.redirect(req.session.redirectTo);
    } else {
      res.render("login", {
        err_message: "パスワードが間違っています。",
      });
    }
  }
});

module.exports = router;
