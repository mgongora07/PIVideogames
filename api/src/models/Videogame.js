const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
   },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.TEXT,
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    released:{
      type:DataTypes.DATEONLY,
    },
    rating:{
      type:DataTypes.DECIMAL,  
    },
    platform:{
      type:DataTypes.STRING, 
      allowNull:false,
    },
    createdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    }
  },{
   timestamps:true,
   createdAt:false,
   updatedAt:false
  });
};



//Videojuego con las siguientes propiedades:- ID: * No puede ser un ID de un videojuego ya existente en la API rawg
//- Nombre *
//- Descripción *
//- Fecha de lanzamiento
//- Rating
//- Plataformas *