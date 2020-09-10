var express = require("express");
var router = express.Router();
const db = require("../db");

/* GET home page. */
router.get("/", async (req, res, next) => {
  console.log("here");
  try {
    res.render("index", { cases: [] });
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const dbCase = await db.query(
      "SELECT * FROM salesforce.case WHERE id = $1",
      [+req.params.id]
    );
    console.log(dbCase.rows[0]);
    res.render("case", { ...dbCase.rows[0] });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      subject,
      description,
      priority,
      contactemail,
      contactmobile,
    } = req.body;
    const {
      rows,
    } = await db.query(
      "INSERT INTO salesforce.case(subject, description, priority, status, contactemail, contactmobile,origin) VALUES($1, $2, $3, $4,$5,$6,$7) RETURNING *",
      [
        subject,
        description,
        priority,
        "NEW",
        contactemail,
        contactmobile,
        "Web",
      ]
    );
    res.flash(
      "success",
      "Case created. Please keep visiting this page for updates to the case."
    );
    res.redirect(`/${rows[0].id}`);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
