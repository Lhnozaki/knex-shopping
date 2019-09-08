exports.up = function(knex) {
  return knex.schema.createTable("Products", table => {
    table.increments("id");
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.integer("inventory");
    table.decimal("price", 8, 2);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Products");
};
