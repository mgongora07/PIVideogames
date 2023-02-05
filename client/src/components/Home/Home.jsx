import React from 'react';
import{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { getVideogames,filterVideogamesByGenre,filterCreated,orderByName, orderByRating  } from '../../actions';
import Card from '../Card/Card';
//import { Paginacion } from '../Paginado/Paginacion';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import "./Home.css";


export default function Home(){
    const dispatch=useDispatch()
    const allvideogames=useSelector((state)=>state.videogames)
    const[,setOrden]=useState('')
    const[currentPage,setCurrentPage]=useState(1) //paginado determina el estado de la pagina y la pagin de inicio
    const[videogamesPerPage]=useState(15) // determina cuantos juegos por pagina
    //const indexOfLastVideogames=currentPage*videogamesPerPage
    //const indexOfFirstVideogame=indexOfLastVideogames-videogamesPerPage
    //const currentVideogames=allvideogames.slice(indexOfFirstVideogame,indexOfLastVideogames)

    const currentVideogames=allvideogames.slice((currentPage-1)*videogamesPerPage,
        (currentPage-1)*videogamesPerPage+videogamesPerPage)




   // const maximo=Math.ceil(allvideogames.length/7)
    
    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    
    
    var creadosFilter=allvideogames.filter(el=>el.createdInDb);
    var validar=creadosFilter.length===0?true:false;
   
    




    useEffect(()=>{
    dispatch(getVideogames())
},[dispatch])


function handleClick(e){
  e.preventDefault();
  dispatch(getVideogames());  
}

function handleFilterGenres(e){
dispatch(filterVideogamesByGenre(e.target.value))
}

function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
}




function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

function handleSortRank(e){
    e.preventDefault();
    dispatch(orderByRating(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}




//MODIFICADO



return(
 <div className='home'>
    {currentVideogames?(   
    <div>
<h1 className='titulo'>HENRY GAME ZONE</h1>
<div className='opciones'>
<Link to='/createvideogame' className='vinculo'>Crear Videojuego</Link>
<Link to='/list' className='vinculo'>Mis Favoritos</Link>
<Link to='/misjuegos' className='vinculo'>Mis Videojuegos</Link>
</div>
<div className='recarga'>
<button onClick={e=>{handleClick(e)}}>
    Volver a cargar los videojuegos
</button>
</div>
<h2 className='tituloh2' >FILTRAR VIDEOJUEGOS</h2>
<div className='filtros'>
<label className='encabezado'>Orden Alfabetico:   </label>
<select className='seleccion' onChange={e=>handleSort(e)}>
    <option value="asc">Ascendente</option>
    <option value="desc">Descendente</option>
</select>
<label className='encabezado'>   Por Puntuación:     </label>
<select className='seleccion' onChange={e=>handleSortRank(e)}   >
    <option value="men">Menor Puntacion</option>
    <option value="may">Mayor Puntuacion</option>
</select>
<label className='encabezado'>   Por Generos:     </label>
<select className='seleccion'  onChange={e=>handleFilterGenres(e)}>
    <option value="All">All</option>
    <option value="Indie">Indie</option>
    <option value="Action">Action</option>
    <option value="Adventure">Adventure</option>
    <option value="Strategy">Strategy</option>
    <option value="Rpg">Rpg</option>
    <option value="Shooter">Shooter</option>
    <option value="Casual">Casual</option>
    <option value="Simulation">Simulation</option>
    <option value="Puzzle">Puzzle</option>
    <option value="Arcade">Arcade</option>
    <option value="Plattformer">Plattformer</option>
    <option value="Racing">Racing</option>
    <option value="Massively Multiplayer">Massively Multiplayer</option>
    <option value="Sports">Sports</option>
    <option value="Figthing">Figthing</option>
    <option value="Family">Family</option>
    <option value="Board Games">Board Games</option>
    <option value="Educational">Educational</option>
    <option value="Card">Card</option>
</select>
<label className='encabezado'>   Todos/Creados/Existentes:     </label>
<select className='seleccion' onChange={e=>handleFilterCreated(e)}>
    <option value="All">Todos</option>
    <option  value="created" disabled={validar}>Creados</option>
    <option value="api">Existente</option>
</select>
</div>





{/*<Paginacion 
currentPage={currentPage}
setCurrentPage={setCurrentPage}
maximo={maximo}
    />*/}

<div className='paginado'>
<Paginado
videogamesPerPage={videogamesPerPage}
allVideogames={allvideogames.length}
paginado={paginado}
/>
</div>
<div className='busqueda'>
<SearchBar/>
</div>

{currentVideogames.length>0?(   
<div>
{currentVideogames?.map((c)=>{
return(
    <div>
    <div>
<Link to={`/videogame/${c.id}`}>
<Card 
 key={c.id}
 name={c.name} 
 image={c.image?c.image:c.image="https://previews.123rf.com/images/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-foto-no-disponible-icono-del-vector-aislado-en-la-ilustraci%C3%B3n-transparente-transparente-concepto-de-.jpg"}
 rating={c.rating}
 genres={c.genres}
 />
 </Link>
 
 </div>
 
</div>
)
})}
</div>):<div className='picachu'><img src={"https://i.pinimg.com/originals/70/ee/1c/70ee1c0f33a37223858486fbf45cd39d.gif"}  alt={"Not Found"} /></div>}
<div className='prueba'>DERECHOS RESERVADOS</div>
</div>

):
(<div className='picachu'><img src={"https://i.pinimg.com/originals/70/ee/1c/70ee1c0f33a37223858486fbf45cd39d.gif"}  alt={"Not Found"} /></div>)}



</div>)}

