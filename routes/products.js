const express = require("express");
const router = express.Router();
const db = require("../database/index");

router.delete("/:product_id", (req, res) => {
  let id = req.params.product_id;
  let errorMessage;
  db.raw(`SELECT * FROM "Products" WHERE id = ?`, [id])
    .then(results => {
      if (results.rows.length === 0) {
        errorMessage = "Could not find product";
        throw err;
      } else {
        db.raw(`DELETE FROM "Products" WHERE id = ? RETURNING *`, [id]).then(
          results => {
            res.json({
              message: `Product id: ${id} successfully deleted`
            });
          }
        );
      }
    })
    .catch(err => {
      res.status(500).json({ message: errorMessage });
    });
});

router.put("/:product_id", (req, res) => {
  let id = req.params.product_id;
  let newTitle = req.body.title;
  let newDescription = req.body.description;
  let newInventory = req.body.inventory;
  let newPrice = req.body.price;
  let errorMessage;
  db.raw(`SELECT * FROM "Products" WHERE id = ?`, [id])
    .then(results => {
      if (results.rows.length === 0) {
        errorMessage = "Could not find product";
        throw err;
      } else {
        db.raw(
          `UPDATE "Products" SET title = ?, description = ?, inventory = ?, price = ? WHERE id = ? RETURNING *`,
          [newTitle, newDescription, newInventory, newPrice, id]
        ).then(results => {
          res.status(200).json(results.rows);
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: errorMessage });
    });
});

router.post("/new", (req, res) => {
  let newTitle = req.body.title;
  let newDescription = req.body.description;
  let newInventory = req.body.inventory;
  let newPrice = req.body.price;
  let errorMessage;
  db.raw(`SELECT * FROM "Products" WHERE title = ?`, [newTitle])
    .then(results => {
      if (results.rows.length > 0) {
        errorMessage = "Product already exists. Please enter another.";
        throw error;
      } else {
        db.raw(
          `INSERT INTO "Products" (title, description, inventory, price) VALUES(?,?,?,?) RETURNING *`,
          [newTitle, newDescription, newInventory, newPrice]
        ).then(results => {
          res.status(200).json(results.rows);
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: errorMessage });
    });
});

router.get("/:products_id", (req, res) => {
  let id = req.params.products_id;
  let errorMessage;
  db.raw(`SELECT * FROM "Products" where id = ?`, [id])
    .then(results => {
      if (results.rows.length === 0) {
        errorMessage = "Could not find product";
        throw error;
      } else {
        res.status(200).json({ Product: results.rows[0] });
      }
    })
    .catch(err => {
      res.status(500).json({ message: errorMessage });
    });
});

router.get("/", (req, res) => {
  db.raw(`SELECT * FROM "Products"`).then(results => {
    res.send({ "List of Products": results.rows });
  });
});

module.exports = router;
