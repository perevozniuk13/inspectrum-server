exports.up = function (knex) {
  return knex.schema.createTable("palettes", (table) => {
    table.increments("id").primary();
    table.string("colour1").notNullable();
    table.string("colour2").notNullable();
    table.string("colour3").notNullable();
    table.string("colour4").notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("palettes");
};
