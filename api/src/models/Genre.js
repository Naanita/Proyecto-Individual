const { DataTypes } = require("sequelize");

//los modelos se hacen con la sintasis/estructura que apredimos y utilizamos en el m4 para crear con la sintasix que conocemos de obejeto, crear tablas/modelos  donde se irá almacenando la información  

module.exports = (sequelize) => {
  sequelize.define("genre", { //Se define el nombre de la tabla
    id: {
      type: DataTypes.UUID, //tipo de id que se autogenera en el momento, con numeros y letras (alfanumerico)
      allowNull: false, //validador que se pregunta si permitimos que el valor sea igual a null, es decir que si puede o no estar vacio.
      primaryKey: true, //identificador del nombre de la columna
      defaultValue: DataTypes.UUIDV4, //valor por default para que se genere automaticamente.
    },

    name: {
      type: DataTypes.STRING, //tipo de data string
      allowNull: false,
    },
  });
};

//columnas de la tabla