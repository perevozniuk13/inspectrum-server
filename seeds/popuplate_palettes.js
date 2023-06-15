exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("palettes").del();
  await knex("palettes").insert([
    {
      id: 1,
      colour1: "#FF0000",
      colour2: "#00FF00",
      colour3: "#0000FF",
      colour4: "#FFFF00",
    },
    {
      id: 2,
      colour1: "#FFA500",
      colour2: "#800080",
      colour3: "#008000",
      colour4: "#FFC0CB",
    },
    {
      id: 3,
      colour1: "#800000",
      colour2: "#00FFFF",
      colour3: "#FF00FF",
      colour4: "#008080",
    },
    {
      id: 4,
      colour1: "#FFFFF0",
      colour2: "#F0FFF0",
      colour3: "#F0F8FF",
      colour4: "#F5F5DC",
    },
    {
      id: 5,
      colour1: "#DC143C",
      colour2: "#7FFFD4",
      colour3: "#FF4500",
      colour4: "#DA70D6",
    },
    {
      id: 6,
      colour1: "#FFD700",
      colour2: "#FF69B4",
      colour3: "#6A5ACD",
      colour4: "#FF6347",
    },
    {
      id: 7,
      colour1: "#2E8B57",
      colour2: "#BA55D3",
      colour3: "#FF8C00",
      colour4: "#8B4513",
    },
    {
      id: 8,
      colour1: "#556B2F",
      colour2: "#00CED1",
      colour3: "#FF1493",
      colour4: "#ADFF2F",
    },
    {
      id: 9,
      colour1: "#B22222",
      colour2: "#6495ED",
      colour3: "#FF00FF",
      colour4: "#008080",
    },
    {
      id: 10,
      colour1: "#8B0000",
      colour2: "#1E90FF",
      colour3: "#FF8C00",
      colour4: "#800080",
    },
  ]);
};
