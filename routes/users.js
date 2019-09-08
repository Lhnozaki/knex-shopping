const express = require("express");
const router = express.Router();
const db = require("../database/index");

router.delete("/:user_id", (req, res) => {
  let id = req.params.user_id;
  let errorMessage;
  db.raw(`SELECT * FROM "Users" WHERE id = ?`, [id])
    .then(results => {
      if (results.rows.length === 0) {
        errorMessage = "Could not find user";
        throw err;
      } else {
        db.raw(`DELETE FROM "Users" WHERE id = ? RETURNING *`, [id]).then(
          results => {
            res.json({
              message: `User id: ${id} successfully deleted`
            });
          }
        );
      }
    })
    .catch(err => {
      res.status(400).json({ message: errorMessage });
    });
});

router.put("/:user_id/forgot-password", (req, res) => {
  let id = req.params.user_id;
  let newPW = req.body.password;
  let errorMessage;
  db.raw(`SELECT * FROM "Users" WHERE id = ?`, [id])
    .then(results => {
      if (results.rows.length === 0) {
        errorMessage = "Could not find user";
        throw err;
      } else {
        db.raw(`UPDATE "Users" SET password = ? WHERE id = ? RETURNING *`, [
          newPW,
          id
        ]).then(results => {
          res.status(200).json(results.rows);
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: errorMessage });
    });
});

router.post("/register", (req, res) => {
  let newEmail = req.body.email;
  let newPW = req.body.password;
  let errorMessage;
  db.raw(`SELECT * FROM "Users" WHERE email = ?`, [newEmail])
    .then(results => {
      if (results.rows.length > 0) {
        errorMessage = "User already exists. Please choose another.";
        throw error;
      } else {
        db.raw(
          `INSERT INTO "Users" (email, password) VALUES(?,?) RETURNING *`,
          [newEmail, newPW]
        ).then(results => {
          res.status(200).json(results.rows);
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: errorMessage });
    });
});

router.post("/login", (req, res) => {
  let searchEmail = req.body.email;
  let searchPW = req.body.password;
  let errorMessage;
  db.raw(`SELECT * FROM "Users" WHERE email = ?`, [searchEmail])
    .then(results => {
      if (results.rows.length === 0) {
        errorMessage = "Could not find user";
        throw error;
      } else if (results.rows[0].password !== searchPW) {
        errorMessage = "Incorrect Password. Try Again";
        throw error;
      } else {
        res.status(200).json(results.rows[0]);
      }
    })
    .catch(err => res.status(500).json({ message: errorMessage }));
});

router.get("/:user_id", (req, res) => {
  let id = req.params.user_id;
  db.raw(`SELECT * FROM "Users" where id = ${id}`)
    .then(results => {
      res.status(200).json({ user: results.rows[0].email });
    })
    .catch(err => {
      res.status(500).json({ message: `There are no user with id ${id}` });
    });
});

router.get("/", (req, res) => {
  db.raw(`SELECT * FROM "Users"`).then(results => {
    res.send({ "List of User": results.rows });
  });
});

module.exports = router;
