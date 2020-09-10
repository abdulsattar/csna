var express = require("express");
var router = express.Router();
const db = require("../db");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const { rows: cases } = await db.query("SELECT * FROM salesforce.case");
    res.render("admin/cases", { cases: cases, admin: true });
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.get("/case/:id", async (req, res, next) => {
  try {
    const dbCase = await db.query(
      "SELECT * FROM salesforce.case WHERE id = $1",
      [+req.params.id]
    );
    res.render("admin/case", {
      ...dbCase.rows[0],
      admin: true,
    });
  } catch (e) {
    next(e);
  }
});
router.post("/case/:id", async (req, res, next) => {
  try {
    const {
      subject,
      description,
      priority,
      status,
      contactemail,
      contactmobile,
    } = req.body;
    console.log(priority, status);
    await db.query(
      "UPDATE salesforce.case SET subject=$2, description=$3, priority=$4, status=$5, contactemail=$6, contactmobile=$7 WHERE id = $1",
      [
        +req.params.id,
        subject,
        description,
        priority,
        status,
        contactemail,
        contactmobile,
      ]
    );
    res.flash("success", "Updated successfully.");
    res.redirect(`/admin/case/${req.params.id}`);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
