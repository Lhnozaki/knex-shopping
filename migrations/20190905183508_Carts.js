exports.up = function(knex) {
  return knex.schema.createTable("Carts", table => {
    table.increments("id");
    table.integer("user_id").references("Users.id");
    table.integer("products_id").references("Products.id");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Carts");
};
