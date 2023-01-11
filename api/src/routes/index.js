const { Router } = require("express");
const genreR = require("./genre");
const videogameR = require("./videogame");
const platformsR = require("./plataform")
const router = Router();

router.use("/genre", genreR); //middelware quiere decir que en la ruta /gender use genderR
router.use("/videogame", videogameR);
router.use("/platforms", platformsR);


module.exports = router;
