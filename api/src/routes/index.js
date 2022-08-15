require('dotenv').config();

const { Router } = require('express');


//const { Videogame, Genre } = sequelize.models;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require ('./videogames');
const createvideogame=require ('./createvideogame') 
const genres=require ('./genres')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogame',createvideogame);
router.use('/videogames', videogames); //buscar videojuegos//borrar videojuegos
router.use('/genres',genres);


//GET /videogame/{idVideogame}__:



module.exports = router;
