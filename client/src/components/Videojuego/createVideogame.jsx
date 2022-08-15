import React,{useEffect,useState} from "react";
import {Link } from "react-router-dom";
import { postVideogame,getGenres,getVideogames } from "../../actions";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from 'react-router';
import  "./createVideogame.css";


export default function VideoGameCreate(){
    const dispatch=useDispatch()
    const genres=useSelector((state)=> state.genres)
    
    const[botonActivo,setBotonActivo]=useState(false)

    const [input,setInput]=useState({
        name:"",
        image:"",
        description:"",
        released:"",
        rating:0,
        platform:[],
        genre:[]
})

const history=useHistory()


function handleChange(e){
    setInput({
        ...input,
        [e.target.name]:e.target.value
    })
    if(!input.name || !input.image || !input.description || !input.released || input.rating===11){setBotonActivo(false)}else{
        setBotonActivo(true)
    }
}


console.log(input.rating)

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
    dispatch(postVideogame(input))
    alert("Videojuego Creado")
    setInput({
        name:"",
        image:"",
        description:"",
        released:"",
        rating:"",
        platform:[],
        genre:[]
    })
    dispatch(getVideogames()) 
    history.push('/home')
}

useEffect(()=>{
    dispatch(getGenres());
},[dispatch])





return(


    
    <div className="contenedor">

        <Link to='/home' className="eVolver">Volver</Link>
<h1>CREA TU VIDEOJUEGO</h1>
<form onSubmit={(e)=>handleSubmit(e)}>
    <div>
             <label className="formulario">Nombre: </label>
                    <input
                    className="form"
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                    />
                
    </div>
    <br></br>
    <div>
             <label className="formulario">Imagen: </label>
                    <input
                    className="form"
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={handleChange}
                        placeholder="Ingresa un vinculo web"
                    />
    </div>
    <br></br>
    <div>
             <div className="formulario">Descripcion: </div>
                    <input className="describe"
                       // placeholder="Describe tu videojuego....."
                        text="text"
                        value={input.description}
                        name="description"
                        onChange={handleChange}
                       maxLength={100}
                       placeholder="Describe tu juego en menos de 100 caracteres"
                    
                    />
                
    </div>
    <br></br>
    <div>
             <label className="formulario">Lanzamiento: </label>
                    <input
                        type="date"
                        value={input.released}
                        name="released"
                        onChange={handleChange}
                    />
    </div>
    <br></br>
   
    <br></br>
    <div>
                    <label className="formulario">Plataformas</label>
            <label className="formulario"><input
                    type="checkbox"
                    name="PC"
                    value="PC"
                    onChange={(e)=>handleCheck(e)}
                    />PC </label>              
            <label className="formulario"><input
                    type="checkbox"
                    name="iOS"
                    value="iOS"
                    onChange={(e)=>handleCheck(e)}
                    />iOS </label>     
            <label className="formulario"><input
                    type="checkbox"
                    name="Android"
                    value="Android"
                    onChange={(e)=>handleCheck(e)}
                    />Android </label>   
            <label className="formulario"><input
                    type="checkbox"
                    name="macOS"
                    value="macOS"
                    onChange={(e)=>handleCheck(e)}
                    />macOS</label>   
             <label className="formulario"><input
                    type="checkbox"
                    name="PS4"
                    value="PS4"
                    onChange={(e)=>handleCheck(e)}
                    />PS4 </label>   
             <label className="formulario"><input
                    type="checkbox"
                    name="Xbox"
                    value="Xbox"
                    onChange={(e)=>handleCheck(e)}
                    />Xbox </label>   
             <label className="formulario"><input
                    type="checkbox"
                    name="Nintendo"
                    value="Nintendo"
                    onChange={(e)=>handleCheck(e)}
                    />Nintendo</label>   
        </div>
<br></br>
<div>
<label className="formulario">Genero: </label>
<select onChange={(e)=>handleSelect(e)}>
        {genres.map((gen)=>(
            <option value={gen.name}> {gen.name}</option>))}
</select>
</div>
<br></br>
<div>
             <label className="formulario">Rating: </label>
                    <input
                    placeholder="0"
                        type="range"
                        min="0"
                        max="10"
                        value={input.rating}
                        name="rating"
                        onChange={handleChange}
                    />
    </div>


<br></br>
<label className="formulario">*Todos los campos deben de ser llenados de manera correcta para acceder al boton para crear el videojuego, el rating debe ser de minimo 1</label>



<ul><li hidden={true}>{input.genre.map(el=>el+",")}</li></ul>
<button className="crear" typeof="submit" hidden={!botonActivo} >Crear Videojuego</button>
</form>
<br></br>
<hr></hr>
<div className>
{input.genre.map(el=>
    <div className="divgenre1">
    <button  className="divgenre" onClick={()=>handleDelete(el)}> {el} </button>
    </div>
    
)}
</div>

    </div>
)
  

}