require("dotenv").config();
const axios = require("axios");
const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const { APIKEY } = process.env;

const router = Router();

const getApiGames = async () => {
  let apiGames = [];

  const link1 = await axios.get(
    `https://api.rawg.io/api/games?key=${APIKEY}&page=1`
  );
  const link2 = await axios.get(
    `https://api.rawg.io/api/games?key=${APIKEY}&page=2`
  );
  const link3 = await axios.get(
    `https://api.rawg.io/api/games?key=${APIKEY}&page=3`
  );
  const link4 = await axios.get(
    `https://api.rawg.io/api/games?key=${APIKEY}&page=4`
  );
  const link5 = await axios.get(
    `https://api.rawg.io/api/games?key=${APIKEY}&page=5`
  );
  const link6 = await axios.get(
    `https://api.rawg.io/api/games?key=${APIKEY}&page=6`
  );

  apiGames = link1.data.results.concat(
    link2.data.results,
    link3.data.results,
    link4.data.results,
    link5.data.results,
    link6.data.results
  );

  apiGames = apiGames.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      genres: game.genres.map((game) => game.name),
      platforms: game.platforms.map((game) => game.platform.name),
      rating: game.rating,
      released: game.released,
    };
  });
  return apiGames;
};

const dbBase = async () => {
  return await Videogame.findAll({
    include: [Genre],
    // traigo el nombre del genero
  });
};

const getAllGames = async () => {
  const apiDataGames = await getApiGames(); // devuelvo todo la pi
  const dbInfoGames = await dbBase();
  const totalGames = apiDataGames.concat(dbInfoGames);
  return totalGames;
};

router.get("/", async (req, res) => {
  //buscar como: http://localhost:3001/videogame?gName=
  const { gName } = req.query;
  let totalGames = await getAllGames();
  if (gName) {
    let searchGame = totalGames.filter((game) =>
      game.name.toLowerCase().includes(gName.toLowerCase())
    );
    searchGame.length
      ? res.status(200).send(searchGame)
      : res.status(404).json({ msg: `Game not found "${gName}"` });
  } else {
    res.status(200).json(totalGames);
  }
});
// router.get("/", async (req, res) => {
//   const gName = req.query;
//   if (gName) {
//     try {
//       let searchGame = await axios.get(
//         `https://api.rawg.io/api/games?search=${gName}&key=${APIKEY}`
//       );
//       if (!searchGame.data.count)
//         res.status(404).json({ msg: `Video game not found: "${gName}"` });
//       // const db = await Videogame.findAll({include:[{model: Genre}]})
//       const apiGames = searchGame.data.results.map;

//       const filterGames = db.filter((game) => {
//         return {
//           id: games.id,
//           name: game.name,
//           image: game.background_image,
//           genres: game.genres.map((game) => game.name),
//           platforms: game.platforms.map((game) => game.platform.name),
//           rating: game.rating,
//           released: game.released,
//         };
//         return filterGames;
//       });
//       const filterGameDb = Videogame.filter((g) =>
//         g.name.toLowerCase().includes(gName.toLowerCase())
//       );
//       const resultFilter = [...filterGames, ...apiGames.splice(0, 15)];
//       res.send(resultFilter);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   try {
//     let apiGames = [];
//     const url1 = await axios.get(
//       `https://api.rawg.io/api/games?key=${APIKEY}&page=1`
//     );
//     const url2 = await axios.get(
//       `https://api.rawg.io/api/games?key=${APIKEY}&page=2`
//     );
//     const url3 = await axios.get(
//       `https://api.rawg.io/api/games?key=${APIKEY}&page=3`
//     );
//     const url4 = await axios.get(
//       `https://api.rawg.io/api/games?key=${APIKEY}&page=4`
//     );
//     const url5 = await axios.get(
//       `https://api.rawg.io/api/games?key=${APIKEY}&page=5`
//     );
//     const url6 = await axios.get(
//       `https://api.rawg.io/api/games?key=${APIKEY}&page=6`
//     );
//     apiGames = url1.data.results.concat(
//       url2.data.results,
//       url3.data.results,
//       url4.data.results,
//       url5.data.results,
//       url6.data.results
//     );

//     apiGames = apiGames.map((game) => {
//       return {
//         id: game.id,
//         name: game.name,
//         image: game.background_image,
//         genres: game.genres.map((game) => game.name),
//         platforms: game.platforms.map((game) => game.platform.name),
//         rating: game.rating,
//         released: game.released,
//       };

//       return apiGames;
//     });
//     const db = await Videogame.findAll({ include: [{ model: Genre }] });
//     const suma = [...apiGames, ...db];
//     res.json(suma);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id.includes("-")) {
      //detectar UUID en BD
      const gameDb = await Videogame.findOne({
        where: { id },
        include: [Genre],
      });
      return res.json(gameDb);
    }
    const gameApi = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${APIKEY}`
    );
    res.json(gameApi.data);
  } catch (error) {
    res.status(404).json({ error: "Id not found" });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    image,
    description,
    released,
    rating,
    plataforms,
    genre,
    createdInDb,
  } = req.body;
  if (
    !name ||
    !image ||
    !description ||
    !released ||
    !rating ||
    !plataforms ||
    !genre
  )
    res.status(400).json({ msg: "missing data" });
  else {
    const obj = {
      name,
      image,
      description,
      released,
      rating,
      plataforms,
      genre,
      createdInDb,
    };
    const newVG = await Videogame.create(obj);
    let genreDb = await Genre.findAll({
      where: { name: genre },
    });

    newVG.addGenres(genreDb);

    res.status(200).json({ msg: "Successfully created video game!" });
  }
});

module.exports = router;
