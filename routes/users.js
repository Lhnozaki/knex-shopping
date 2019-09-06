const express = require("express");
const router = express.Router();
const db = require("../database/index");

router.get("/:user_id", (req, res) => {
  let id = req.params.user_id;
  db.raw(`SELECT * FROM "Users" where id = ${id}`)
    .then(results => {
      res.json({ user: results.rows[0].email });
    })
    .catch(err => {
      res.status(500).json({ message: `There are no user with id ${id}` });
    });
});

router.get("/", (req, res) => {
  db.raw(`SELECT * FROM "Users"`)
    .then(results => {
      res.json({ user: results.rows });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
