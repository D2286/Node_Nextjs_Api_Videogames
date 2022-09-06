const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.UUID,
      //allowNull: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    createdInDb: {
      //para distinguir entre los que me trae la api y los creados en la base de datos
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
  },
  });
};
