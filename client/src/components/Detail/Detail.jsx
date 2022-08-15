import React from "react";
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { getDetail } from "../../actions";
import { useEffect} from "react";
import { addvideogameFavorite } from '../../actions'; //modificado
import './Detail.css';


export default function Detail(props){
    console.log(props)
    const dispatch=useDispatch()

    const favoritos=useSelector(state=>state.videogamesFavoritos)
    console.log(favoritos)
    
    
     //const dispatch= useDispatch();   




useEffect(()=>{
    dispatch(getDetail(props.match.params.id))
},[dispatch,props.match.params.id])

const myVideogame=useSelector((state)=>state.detail)

//var texto=myVideogame.description
//var sinComillas = texto.replace(/['"]+/g, '')


var busca=favoritos.find(favoritos=>favoritos.id===myVideogame.id)
var encuentra=busca?true:false
console.log(encuentra)

function handleSubmit(e){
    e.preventDefault();
    dispatch(addvideogameFavorite({name:myVideogame.name,id:myVideogame.id,image:myVideogame.image,rating:myVideogame.rating}))
    alert("Videojuego Agregado a tu Lista de Favoritos")
   
}

var datos=myVideogame.createdInDb?false:true
var visible=myVideogame.id===0?true:false



return(

    <div>
        {
        myVideogame.length!==0?(
        <div className="tarjeta">
        <div className="nombre"> {myVideogame.name}</div>
        
        <div className="details">
        <img className="imagen" src={myVideogame.image} alt={myVideogame.name}  />
        <hr className="division"></hr>
        <p className="texto" >{myVideogame.description}</p>
        </div>

        <div className="encabezados">Plataformas</div>
        <div className="text">{myVideogame.platform}</div>
        <div className="encabezados">Fecha de Lanzamiento</div>
        <div className="text">{myVideogame.released}</div>
        <div className="encabezados">Generos</div>
        <div className="text">{myVideogame.genres}</div>
        <div className="encabezados">Rating</div>
        <div className="text">{myVideogame.rating}</div>
       
       <div className="favoritos" >
       <div  hidden={visible}>
        <button  onClick={(e)=>handleSubmit(e)}
        hidden={encuentra}>Agregar a favoritos</button>
        </div>
     
        
        <div className="modifica" hidden={datos}> <Link to={`/myvideogame/${myVideogame.id}`} className="texto" >MODIFICA TU VIDEO JUEGO</Link></div>
        <div className="casa" > <Link to={'/home'} className="texto" >INICIO</Link></div>
        
        
        </div>
        
            

        </div>):
        (<div className='picachu'><img src={"https://66.media.tumblr.com/d49c3db1d3fb78a8fc72fd0a7edb6e48/tumblr_n7wrjeB2J81rey868o1_500.gif"} alt={"Not Found"}/></div>)}
    </div>)}