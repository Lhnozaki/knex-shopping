exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("Users").insert([
        { email: "IAmGroot@gmail.com", password: "Groot" },
        { email: "Robin.Hood@gmail.com", password: "MenInTights" },
        { email: "SamwiseGamgee@gmail.com", password: "MrFodo!" },
        {
          email: "prince@gmail.com",
          password: "TheArtistFormerlyKnownAsPrince"
        },
        { email: "theDarkKnight@gmail.com", password: "joker" }
      ]);
    });
};
