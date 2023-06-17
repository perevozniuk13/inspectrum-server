exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("collections").del();
  await knex("collections").insert([
    {
      id: 1,
      user_id: 2,
      collection_name: "Brainflix",
    },
    {
      id: 2,
      user_id: 1,
      collection_name: "Bandsite",
    },
  ]);
};
