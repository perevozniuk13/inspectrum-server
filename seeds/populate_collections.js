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
    {
      id: 3,
      user_id: 2,
      collection_name: "Ecommerce",
    },
    {
      id: 4,
      user_id: 4,
      collection_name: "Netflix",
    },
    {
      id: 5,
      user_id: 2,
      collection_name: "Coffee Shop",
    },
    {
      id: 6,
      user_id: 1,
      collection_name: "Travel Site",
    },
  ]);
};
