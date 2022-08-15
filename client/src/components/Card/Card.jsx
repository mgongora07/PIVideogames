import React from 'react';
import './Card.css';





export default function Card ({id,name,image,genres,rating}){

     
    return(
        <div className='card'>
            {id}
            <div className='name'>{name}</div>
            <img src={image} className="img" alt={name}/>
            <div className='genres'>{genres}</div>
            <div className='rating' >Puntuación: {rating}</div>
        </div>
    )
}
