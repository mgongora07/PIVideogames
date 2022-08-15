import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../../actions";
import "./SearchBar.css";


export default function SearchBar(){
   const dispatch=useDispatch();
   const [name,setname]=useState("")

function handleInputChange(e){
    e.preventDefault()
    setname(e.target.value)
  }

function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameVideogames(name))
    
    setname("")

}

return(

    <div>
        <input className="busqueda"
           type='text' 
           placeholder="Buscar..."
           onChange={(e)=>handleInputChange(e)}
           value={name}
           />
    <button  type='submit' onClick={(e)=>handleSubmit(e)}>Buscar</button>
    </div>
)









}