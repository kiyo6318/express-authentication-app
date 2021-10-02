var express = require("express");
var crypto = require("crypto");
var bcrypt = require("bcrypt");
var router = express.Router();
var db = require("../models/");

router.get("/", function (req, res, next) {
  if (req.session.user) {
    res.redirect("/");
  } else {
    req.session.csrfToken = crypto.randomBytes(20).toString("hex");
    res.render("signup", { err_message: "", csrfToken: req.session.csrfToken });
  }
});

router.post("/", async function (req, res) {
  const { count } = await db.user.findAndCountAll({
    where: {
      name: req.body.name,
    },
    offset: 0,
    limit: 1,
  });
  if (req.body._token === req.session.csrfToken) {
    if (count === 0) {
      const newUser = await db.user.create({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      if (newUser) {
        req.session.user = { id: newUser.id, name: newUser.name };
      } else {
        res.render("signup", {
          err_message: "アカウント登録に失敗しました",
          csrfToken: req.session.csrfToken,
        });
      }
      res.redirect("/");
    } else {
      res.render("signup", {
        err_message: "既に同じ名前のアカウントが存在します",
        csrfToken: req.session.csrfToken,
      });
    }
  } else {
    return res.status(419).send("Page Expired");
  }
});

module.exports = router;
