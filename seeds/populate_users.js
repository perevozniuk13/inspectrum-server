exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      first_name: "John",
      last_name: "Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      password: "password123",
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      password: "password456",
    },
    {
      first_name: "Michael",
      last_name: "Johnson",
      username: "michaeljohnson",
      email: "michael.johnson@example.com",
      password: "password789",
    },
    {
      first_name: "Sarah",
      last_name: "Williams",
      username: "sarahwilliams",
      email: "sarah.williams@example.com",
      password: "passwordabc",
    },
    {
      first_name: "David",
      last_name: "Brown",
      username: "davidbrown",
      email: "david.brown@example.com",
      password: "passworddef",
    },
    {
      first_name: "Emily",
      last_name: "Taylor",
      username: "emilytaylor",
      email: "emily.taylor@example.com",
      password: "passwordghi",
    },
    {
      first_name: "Daniel",
      last_name: "Anderson",
      username: "danielanderson",
      email: "daniel.anderson@example.com",
      password: "passwordjkl",
    },
    {
      first_name: "Olivia",
      last_name: "Thomas",
      username: "oliviathomas",
      email: "olivia.thomas@example.com",
      password: "passwordmno",
    },
    {
      first_name: "Matthew",
      last_name: "Miller",
      username: "matthewmiller",
      email: "matthew.miller@example.com",
      password: "passwordpqr",
    },
    {
      first_name: "Ava",
      last_name: "Davis",
      username: "avadavis",
      email: "ava.davis@example.com",
      password: "passwordstu",
    }
  ]);
};
