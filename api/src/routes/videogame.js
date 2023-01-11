require("dotenv").config();
const axios = require("axios");
const { Router } = require("express");
const { Videogame, Genre, Platform } = require("../db");
const { APIKEY } = process.env;

const router = Router();
//recibo  toda la información necesaria de la API
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

  //para no traerme toda la información de la API me serciore de que la API por pagina me monstraba 20 juegos, en este caso me traje 120 por seguridad.

  // con promesas >
  
  // const promises1 = axios.get(API info)
  // const promises2 = axios.get(API info)
  // const promises3 = axios.get(API info).....
  // await Promise.all([promise1, promise2, promise3]).then(function (
  //   g
  //   ) {
  //     apiGames = g[0].data.results
  //       .concat(g[1].data.results)
  //       .concat(g[2].data.results);
  //   });
  // await GetApiGames

  apiGames = link1.data.results.concat(
    // Uno todas las variables declaradas y la meto en el array
    link2.data.results,
    link3.data.results,
    link4.data.results,
    link5.data.results,
    link6.data.results
  );

  apiGames = apiGames.map((game) => { //hago un map a los resultados, para que solo me traiga la información que necesito
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      genres: game.genres,
      platforms: game.platforms = game.platforms.map((pgame)=> pgame.plataform),
      rating: game.rating,
      released: game.released,
    };
  });
  return apiGames;
  
};

const dbBase = async () => { //Pedido a la base de datos
  return await Videogame.findAll({//Este método devuelve todos los elementos para los que el iterador devolvió verdadero // true.
    include: [Genre, Platform], //arreglo con los juegos de la base de datos, es decir lo que hemos creado nosotros
    // traigo el nombre del genero
  });
};

const getAllGames = async () => {
  const apiDataGames = await getApiGames(); 
  const dbInfoGames = await dbBase();
  const totalGames = apiDataGames.concat(dbInfoGames); //uno los juegos de la api, con los mios
  return totalGames;
};

router.get("/", async (req, res) => {
  //buscar como: http://localhost:3001/videogame?gName=
  const { gName } = req.query; //la query sera = a gName, para la forma de buscar el juego por nombre directo y/0 similar 
  let totalGames = await getAllGames();
  if (gName) { // si hay una solicitud, crea un nuevo array si incluye el nombre o similitud de este en la solicitud
    let searchGame = totalGames.filter((game) => // el metodo filter crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada, es decir que los juegos con resultados similares a los de la query quedaran guardados en el nuevo arr.
      game.name.toLowerCase().includes(gName.toLowerCase())//tolowecase convierte el valor en minusculas, esto asi, para que no exista un error de sintaxis por la forma en que el usuario escribe la petición
    );
    searchGame.length
      ? res.status(200).send(searchGame)
      : res.status(404).json({ msg: `Game not found "${gName}"` }); // si exite una respuesta, mandala y si no existe considencia o similitud, envia un error
  } else { 
    res.status(200).json(totalGames);// de lo contrario devuelve todos los juegos 
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
    platforms,
    genres,
  } = req.body; //La solicitud debe contener esta información
  if (
    !name ||
    !image ||
    !description ||
    !released ||
    !rating ||
    !platforms ||
    !genres
  )
    res.status(400).json({ msg: "missing data" });
  else {
    const obj = {
      name,
      image,
      description,
      released,
      rating,
      platforms,
      genres,
    };
    const newVG = await Videogame.create(obj);
    let genreDb = await Genre.findAll({//Este método devuelve todos los elementos para los que el iterador devolvió verdadero // true.
      where: { name: genres },
    });
    let platformDb = await Platform.findAll({//Este método devuelve todos los elementos para los que el iterador devolvió verdadero // true.
      where: { name: platforms },
    });
    newVG.addGenres(genreDb);// lo que hace aca es relacionar nuestro nuevo videojuego con el genero de la db
    newVG.addPlatforms(platformDb); //funciones de sequelize para relacionarlos





    
    //El método findOrCreate() de Sequelize es un método de consulta que intenta encontrar una entrada en su tabla o crear una nueva entrada cuando no se encuentra nada.

//El método requiere que se especifique una condición WHERE y, si no se encuentra ninguna entrada, INSERTARÁ una nueva fila en la tabla utilizando los parámetros especificados al llamar al método.

    res.status(200).json({ msg: "Successfully created video game!" });
  }
});

module.exports = router;
