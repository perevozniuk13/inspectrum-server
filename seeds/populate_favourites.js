exports.seed = async function (knex) {
  await knex("favourites").del();
  await knex("favourites").insert([
    {
      id: 1,
      user_id: 2,
      palette_id: 1,
    },
    {
      id: 2,
      user_id: 1,
      palette_id: 6,
    },
    {
      id: 3,
      user_id: 1,
      palette_id: 7,
    },
    {
      id: 4,
      user_id: 2,
      palette_id: 9,
    },
  ]);
};
