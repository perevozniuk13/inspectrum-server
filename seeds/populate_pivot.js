exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("pivot").del();
  await knex("pivot").insert([
    {
      id: 1,
      palette_id: 2,
      collection_id: 1,
    },
    {
      id: 2,
      palette_id: 2,
      collection_id: 2,
    },
    {
      id: 3,
      palette_id: 1,
      collection_id: 2,
    },
    {
      id: 4,
      palette_id: 6,
      collection_id: 1,
    },
    {
      id: 5,
      palette_id: 2,
      collection_id: 4,
    },
    {
      id: 6,
      palette_id: 1,
      collection_id: 4,
    },
  ]);
};
