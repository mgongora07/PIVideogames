import React from 'react';
import './Card.css';
import { useDispatch } from 'react-redux';
import { removevideogameFavorite } from '../../actions';




export default function Card ({id,name,image,genres,rating}){

 const dispatch=useDispatch()    

    return(
        <div className='cardFav'>
            
            <div className='nameEnlace'>{name}</div>
            <img src={image} className="img" alt={name}  />
            <div className='name'>Rating</div>
            <div className='rating'>{rating}</div>
            <button  onClick={()=>dispatch(removevideogameFavorite(id))}>ELIMINAR DE FAVORITOS</button> 
        </div>
    )
}


