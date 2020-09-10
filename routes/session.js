var express = require("express");
var router = express.Router();
const db = require("../db");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("session/login");
});
router.post("/", async (req, res, next) => {
  try {
    const {
      rows,
    } = await db.query(
      "SELECT * FROM salesforce.sna_admin__c WHERE email__c = $1 AND password__c =  $2",
      [req.body.email, req.body.password]
    );
    if (rows.length > 0) {
      req.session.uid = rows[0].id;
      return res.redirect("/admin");
    }
    res.flash("error", "Invalid username or password");
    res.render("session/login");
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;
