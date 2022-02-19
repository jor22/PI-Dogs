const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_max: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_min: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
    },
    img: {
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://wallpaperaccess.com/full/3845930.jpg"
     },
  },
  {
    timestamps: false,
  }
);
};
