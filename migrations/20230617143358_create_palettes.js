exports.up = function (knex) {
  return knex.schema.createTable("palettes", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("colour1").notNullable();
    table.string("colour2").notNullable();
    table.string("colour3").notNullable();
    table.string("colour4").notNullable();
    table.integer("hue1").unsigned().notNullable();
    table.integer("hue2").unsigned().notNullable();
    table.integer("hue3").unsigned().notNullable();
    table.integer("hue4").unsigned().notNullable();
    table.integer("likes").unsigned().defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("palettes");
};
