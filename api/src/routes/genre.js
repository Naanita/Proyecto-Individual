require("dotenv").config();
const axios = require("axios");
const { Router } = require("express");
const { Genre } = require("../db");
const { APIKEY } = process.env;

const router = Router();

router.get("/", async (req, res) => {
  try {

    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`
    );
    const nameGenres = genresApi.data.results;





    nameGenres.forEach(async (Ge) => {
      await Genre.findOrCreate({
        where: {
          name: Ge.name,
        }



      });
    });
    const allGenres = await Genre.findAll();
    res.send(allGenres);

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
