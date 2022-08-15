require("dotenv").config();
const {Router}=require('express');
const{Videogame,Genre}=require ('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;
const router= Router();


router.post('/',async(req,res)=>{
const{name,image,description,released,rating,platform,createdInDb,genre}=req.body;

let plataformString=platform.join(',')

let gamecreated= await Videogame.create({
    name,
    image,
    description,
    released,
    rating,
    platform:plataformString,
    createdInDb,
}) //hasta aqui se creo la parte de la tabla videojuegos

let genero= await Genre.findAll({
    where:{name:genre}  
})
gamecreated.addGenre(genero)
res.send('Videojuego creado')

})



const getDbgamesID= async()=>{
    return await Videogame.findAll({
        include:{
            model:Genre,
            attributes:['id'],
            trough:{
                attributes:[]
            }
        }
    })
}


https://api.rawg.io/api/games/{id}




router.get('/:id', async (req,res)=>{
    const {id}=req.params;
    var demo={
        id:0,
        name:"El nombre que quieras",
        image:"https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_1440x810/public/media/image/2021/02/30-mejores-heroes-ultimos-30-anos-2243371.jpg?itok=QBzXQlZU",
        description:"Descripcion de tu videojuego"    
    }
     if(id==="nofound")return res.json(demo)
     
     if(id.includes('-')){
        const videogameDB=await Videogame.findOne({
            where:{id},
            include:{
                model:Genre,
                attributes:['name'],
                through:{attributes:[]}}})
         let juegoLocal=videogameDB
         const datosDB={
            id:juegoLocal.id,
            name:juegoLocal.name,
            image:juegoLocal.image,
            rating:juegoLocal.rating,
            description:juegoLocal.description,
            released:juegoLocal.released,
            platform:juegoLocal.platform,
            createdInDb:juegoLocal.createdInDb,
            genres: juegoLocal.genres.map(p => p.name).join(', ')
         }        
                return res.json(datosDB)
    }else{
      var videogamesAPI= await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      var videAPIfound=videogamesAPI.data
      var results={
        id:videAPIfound.id,
        name:videAPIfound.name,
        image:videAPIfound.background_image,
        description:videAPIfound.description_raw,
        released:videAPIfound.released,
        rating:videAPIfound.rating,
        platform: videAPIfound.platforms.map((p) =>
        p.platform.name).filter(p => p != null).join(', '),
        genres:videAPIfound.genres.map(p=>{
            return p.name
        })
        }
res.json(results)

    }
}

)

module.exports=router;