exports.up = function (knex) {
  return knex.schema.createTable("pivot", (table) => {
    table.increments("id").primary();
    table
      .integer("collection_id")
      .unsigned()
      .references("collections.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("palette_id")
      .unsigned()
      .references("palettes.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pivot");
};
