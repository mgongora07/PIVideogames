require('dotenv').config();
const axios  = require('axios');
const { Router } = require('express');
//const { generatePath } = require('react-router-dom');
const {API_KEY}=process.env;

const { Videogame, Genre } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
 
 
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApigames=async ()=>{
    let resultados=[]
    let apiJuego=`https://api.rawg.io/api/games?key=${API_KEY}`
    for(let i = 1; i <= 5; i++){
    let apiUrl= await axios.get(apiJuego);
    apiUrl.data?.results.forEach((jgo)=>{
    resultados.push({
        name:jgo.name,
        image:jgo.background_image,
        genres:jgo.genres.map((gen)=>gen.name).filter(p=>p!=null).join(','),
        id:jgo.id,
        rating:jgo.rating,
        platform:jgo.platforms.map(p=>{
            return p.platform.name
        })
    })
    apiJuego=apiUrl.data.next
});
}
let dbGames = await Videogame.findAll({ include: [Genre] })
let jsonGames = dbGames.map((J) => J.toJSON())
jsonGames.forEach(C => {
  C.genres = C.genres.map((genre) => genre.name).filter(p => p != null).join(', ')
});

    resultados=resultados.concat(jsonGames)
    return resultados
}

//const getDbgames= async()=>{
//    return await Videogame.findAll({
//       include:{
//           model:Genre,
//           attributes:['name'],
//           trough:{
//               attributes:[]
//           }
//       }
//   })
//  }


function getDbgames(){
  return new Promise((resolve)=>{
    resolve( Videogame.findAll({
      include:{
          model:Genre,
          attributes:['name'],
          trough:{
              attributes:[]
          }
      }


  }))
})}





router.get('/',async(req,res)=>{
    const {name}=req.query;
    let juegostotales= await getApigames()
    if(!name){res.status(200).json(juegostotales)}else
    {
    let gamesAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=100`) 
    var gamesAPIFull = gamesAPI.data.results.map((juegos) => {
      var game = {
        id: juegos.id,
        name: juegos.name,
        rating: juegos.rating,
        image: juegos.background_image,
        genres: juegos.genres && juegos.genres.map((p) => p.name).filter(p => p != null).join(', '),
      };
      return game;
    })
   
    
   let juegostotales= await getDbgames();
    let npjuego=juegostotales.filter(el=>el.name.toLowerCase().includes(name.toLocaleLowerCase()))
  // var prueba=njuego.length?njuego:"el juego no esta EN LA BASE DE DATOS "
    let njuego=npjuego.map((J)=>J.toJSON())
    njuego.forEach(C=>{
       C.genres=C.genres.map((genre)=>genre.name).filter(p=>p !=null).join(',')
    })

var demo={
  id:"nofound",
  name:`El nombre ${name} no esta en uso`,
  genres:"Crea tu videojuego"
}



  total=gamesAPIFull.concat(njuego)
  if(total.length===0)total.push(demo) 
  
   //prueba=total.length?total:notFound
  console.log(total)
  res.json(total)


}
}
)
 


router.put('/',async(req,res)=>{
    const {id,name,image,description,released,rating,platform,genre}=req.body;
    let plataformString=platform.join(',')
 
    const actualiza=await Videogame.update({
        id:id,
        name:name,
        description:description,
        image:image,
        released:released,
        rating:rating,
        platform:plataformString,
      
      },
      {where: { id: id }});
     

    res.send("Juego actualizado")
})




router.delete('/:id',async(req,res)=>{
    try{
        const{id}=req.params;
        const games= await Videogame.findByPk(id);
        if (games===null){
            return res.status(400).send("Juego no encontrado");
        }else{
            await games.destroy();
            return res.send("juego borrado");
}
} catch(error){
 res.status(400).send({errMsg:error})
}
})
     
   




module.exports = router;
