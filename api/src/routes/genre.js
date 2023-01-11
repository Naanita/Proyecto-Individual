require("dotenv").config();
const axios = require("axios");
const { Router } = require("express");
const { Genre } = require("../db");
const { APIKEY } = process.env;

const router = Router();

router.get("/", async (req, res) => {
  try {
    // si ya los tengo cargados en la DB los consumo desde alli.
    const genresDb = await Genre.findAll();
    if (genresDb.length) return res.json(genresDb);

    //de lo contrario ------>
    const genresApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${APIKEY}`
    );
    const nameGenres = genresApi.data.results;
    const genres = nameGenres.map((gen) => {
      return {
        id: gen.id,
        name: gen.name,
      };
    });
    res.json(genres);
    // axios
    //   .get(`https://api.rawg.io/api/genres?key=${APIKEY}`)
    //   .then((response) => {
    //     let aux = response.data.results.map((ep) => {
    //       const obj = {
    //         id: ep.id,
    //         name: ep.name,
    //       };
    //       return obj;
    //     });

    //     Genre.bulkCreate(aux);
    //     res.json({ msg: "success" });
    //   });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
