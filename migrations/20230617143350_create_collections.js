exports.up = function (knex) {
  return knex.schema.createTable("collections", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("collection_name").notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("collections");
};
