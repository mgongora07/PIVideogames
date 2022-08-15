import React from 'react';
import './Card.css';
import { useDispatch } from 'react-redux';
import { deleteVideogame } from '../../actions';
import { useHistory } from 'react-router';



export default function Card ({id,name,image,genres,rating}){

 const dispatch=useDispatch()    
 const history=useHistory()

 function handleSubmit(e){
    e.preventDefault();
    dispatch(deleteVideogame(id))
    alert("Videojuego eliminado de tu base de datos")
    history.push('/home')
}


    return(
        <div className='cardFav'>
            
            <h1 className='nameEnlace'>{name}</h1>
            <img src={image}  className="img" alt={name} />
            <div className='genres'>{genres}</div>
            <div className='name'>Rating</div>
            <div className='rating'>{rating}</div>
            <button onClick={e=>{handleSubmit(e)}}>ELIMINAR</button> 
        </div>
    )
}



