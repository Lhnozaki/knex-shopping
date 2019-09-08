exports.up = function(knex) {
  return knex.schema.createTable("Users", table => {
    table.increments("id");
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Users");
};
