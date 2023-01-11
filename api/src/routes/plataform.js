const { Router } = require('express');
const axios = require("axios");
const { Platform } = require('../db')
const { APIKEY} = process.env;

const router = Router();

router.get("/", async (req, res) => {
    try {
        const platformsApi = await axios.get(`https://api.rawg.io/api/platforms?key=${APIKEY}`);
        const nameplatforms = platformsApi.data.results;
    const platforms = nameplatforms.map((gen) => {
      return {
        id: gen.id,
        name: gen.name,
      };
    });
    res.json(platforms);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router; 