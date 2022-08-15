import React from "react";
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { getDetail, modificarVideojuego,getGenres,getVideogames } from "../../actions";
import { useEffect,useState} from "react";
import { useHistory } from 'react-router';
import './ModificarVideojuego.css'


export default function Detail(props){


    
    
     //const dispatch= useDispatch();   
     const dispatch=useDispatch()
     const genres=useSelector((state)=> state.genres)
     
     const[botonActivo,setBotonActivo]=useState(false)
 
     const [input,setInput]=useState({
         id:"",
         name:"",
         image:"",
         description:"",
         released:"",
         rating:"",
         platform:[],
         genre:[]
 })
 
 const history=useHistory()

 function handleChange(e){
     setInput({
         ...input,
         [e.target.name]:e.target.value
     })
     if(!input.name || !input.image || !input.description || !input.released){setBotonActivo(false)}else{
         setBotonActivo(true)
     }
 }
 
 function handleCheck(e){
     if(e.target.checked){
         setInput({
             ...input,
             platform:[...input.platform,e.target.value]
         })
     }
 }
 
 
 function handleSelect(e){
     setInput({
         ...input,
         genre:[...input.genre,e.target.value]
     })
 }
 
 function handleDelete(el){
     setInput({
         ...input,
         genre:input.genre.filter(gen=>gen!==el)
     })
 }
 
 
 
 
 function handleSubmit(e){
     e.preventDefault();
     console.log(input)
     dispatch(modificarVideojuego(input))
     alert("Videojuego Modificado")
     setInput({
         id:"",
         name:"",
         image:"",
         description:"",
         released:"",
         rating:"",
         platform:[],
         genre:[]
     })
     dispatch(getVideogames()) 
     history.push('/videogame/'+myVideogame.id)
  
   
 }
 
 useEffect(()=>{
     dispatch(getGenres());
 },[dispatch])
 



useEffect(()=>{
    dispatch(getDetail(props.match.params.id))
},[dispatch,props.match.params.id])

const myVideogame=useSelector((state)=>state.detail)
console.log(myVideogame)

input.id=myVideogame.id



return(

    <div>
        {
        myVideogame?
        
        <div>
        <h1 className="tituloh1" >MODIFICA TU VIDEOJUEGO</h1>
     
        <div className="tituloM"> {myVideogame.name}</div>
        <img src={myVideogame.image}  width="600px" height="350px" alt={"Not Found"}  />
        <div className="descrip">
        <p>{myVideogame.description}</p>
        </div>
        <div className="descrip">{myVideogame.released}</div>
        <div className="descrip">{myVideogame.rating}</div>
        <div className="descrip">{myVideogame.platform}</div>
        <div className="descrip">{myVideogame.genres}</div>
        
        <div>



<form onSubmit={(e)=>handleSubmit(e)}>
<div className="cuerpo">
    
     <input
        value={input.id}
        name="id"
        onChange={handleChange}
        hidden="true"
        />
        
     <label className="titulosM">Nombre: </label>
            <input
                className="textM"
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
    
            />
        
</div>
<div>
     <label className="titulosM">Imagen: </label>
            <input
                className="textM"
                type="text"
                value={input.image}
                name="image"
                onChange={handleChange}
            />
</div>
<div>
     <label className="titulosM" >Descripcion: </label>
            <input
                className="textM"
                type="text"
                value={input.description}
                name="description"
                onChange={handleChange}
            />
</div>
<div>
     <label className="titulosM" >Lanzamiento: </label>
            <input
                type="date"
                value={input.released}
                name="released"
                onChange={handleChange}
            />
</div>
<div>
     <label className="titulosM" >Rating: </label>
            <input
                type="range"
                min="0"
                max="10"
                value={input.rating}
                name="rating"
                onChange={handleChange}
            />
</div>
<div>
            <label className="titulosM" >Plataformas</label>
    <label className="titulosM"  ><input
            type="checkbox"
            name="PC"
            value="PC"
            onChange={(e)=>handleCheck(e)}
            />PC </label>              
    <label className="titulosM" ><input
            type="checkbox"
            name="iOS"
            value="iOS"
            onChange={(e)=>handleCheck(e)}
            />iOS </label>     
    <label className="titulosM"><input
            type="checkbox"
            name="Android"
            value="Android"
            onChange={(e)=>handleCheck(e)}
            />Android </label>   
    <label className="titulosM" ><input
            type="checkbox"
            name="macOS"
            value="macOS"
            onChange={(e)=>handleCheck(e)}
            />macOS</label>   
     <label className="titulosM"><input
            type="checkbox"
            name="PS4"
            value="PS4"
            onChange={(e)=>handleCheck(e)}
            />PS4 </label>   
     <label className="titulosM"  ><input
            type="checkbox"
            name="Xbox"
            value="Xbox"
            onChange={(e)=>handleCheck(e)}
            />Xbox </label>   
     <label className="titulosM"><input
            type="checkbox"
            name="Nintendo"
            value="Nintendo"
            onChange={(e)=>handleCheck(e)}
            />Nintendo</label>   
</div>

<button typeof="submit" hidden={!botonActivo} className="mod">Modificar</button>

</form>
<Link to='/home' className="descripV">Volver</Link>




</div>
        


        






        </div>: 
        <p>Loading...</p>}
    </div>











)}