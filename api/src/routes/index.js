const { Router } = require("express");
const genreR = require("./genre");
const videogameR = require("./videogame");

const router = Router();

router.use("/genre", genreR); //middelware quiere decir que en la ruta /gender use genderRoute
router.use("/videogame", videogameR);

//router.get('/', (req, res, next)=> {
//    res.send('Soy el get de /Videogame')
//  });

module.exports = router;
