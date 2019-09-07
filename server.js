const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
