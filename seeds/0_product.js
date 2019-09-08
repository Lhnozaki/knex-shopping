exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("Products").insert([
        {
          title: "poke",
          description: "The spiciest of Ahi's.",
          inventory: 10,
          price: 12.0
        },
        {
          title: "milk",
          description: "Soy Milk is the Best Milk.",
          inventory: 20,
          price: 6.0
        },
        {
          title: "steak",
          description: "30 day dry-aged sirloin top.",
          inventory: 7,
          price: 17.0
        },
        {
          title: "rice",
          description: "The rice of my people. Jasmin rice.",
          inventory: 100,
          price: 5.0
        },
        {
          title: "seafood",
          description: "King Crab from Alaska.",
          inventory: 15,
          price: 23.0
        }
      ]);
    });
};
