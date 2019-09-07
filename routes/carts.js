const express = require("express");
const router = express.Router();
const db = require("../database/index");

router.delete("/:user_id/:product_id", (req, res) => {
  let user_id = req.params.user_id;
  let prod_id = req.params.product_id;
  let errorMessage;
  let arr = [];
  db.raw(`SELECT * FROM "Carts" WHERE user_id = ?`, [user_id])
    .then(results => {
      if (results.rows.length === 0) {
        errorMessage = "Cannot find user";
        throw err;
      }

      results.rows.forEach(e => {
        arr.push(e.products_id);
      });

      if (!arr.includes(parseInt(prod_id))) {
        errorMessage = "Cannot find product";
        throw err;
      } else {
        db.raw(
          `DELETE FROM "Carts" WHERE user_id = ? AND products_id = ? RETURNING *`,
          [user_id, prod_id]
        ).then(results => {
          res.json({ success: true });
        });
      }
    })
    .catch(err => {
      res.status(400).json({ message: errorMessage });
    });
});

router.post("/:user_id/:product_id", (req, res) => {
  let user_id = req.params.user_id;
  let prod_id = req.params.product_id;
  db.raw(`INSERT INTO "Carts" (user_id, products_id) VALUES(?,?) RETURNING *`, [
    user_id,
    prod_id
  ]).then(results => {
    res.status(200).json({ success: true });
  });
});

router.get("/:user_id", (req, res) => {
  let id = req.params.user_id;
  db.raw(
    `SELECT "Products".title, "Products".description, "Products".inventory, "Products".price FROM "Carts" INNER JOIN "Users" ON "Carts".user_id = "Users".id
    INNER JOIN "Products" ON "Carts".products_id = "Products".id
    WHERE user_id = ?`,
    [id]
  ).then(results => {
    res.status(200).json({ "Current shopping cart": results.rows });
  });
});

router.get("/", (req, res) => {
  db.raw(`SELECT * FROM "Carts"`).then(results => {
    res.status(200).json(results.rows);
  });
});

module.exports = router;
