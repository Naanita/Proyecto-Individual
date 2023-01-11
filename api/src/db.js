require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1), //devuvle el valor en mayusculas
  entry[1], //acá ya estan nuestras tablas
]); 
sequelize.models = Object.fromEntries(capsEntries);
 
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre, Platform } = sequelize.models; //destructuración de las tablas 

// Aca vendrian las relaciones


Videogame.belongsToMany(Genre, { //relacion de muchos a muchos

//creación de tablas intermedias
  through: "genre_videogame",

  //VIDEOGAMES ______ GENRE-VIDEOGAMES ___________GENRE
    //    1              1 - 3                       3
});

Genre.belongsToMany(Videogame, {
  through: "genre_videogame",
});

Videogame.belongsToMany(Platform, {
  through: "platform_videogame",
});

Platform.belongsToMany(Videogame, {
  through: "platform_videogame",
});
// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
