import React from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../Card/CardDelete';
import './MisVideojuegos.css'



export default function MisVideojuegos(){
    
    

    const creados=useSelector(state=>state.videogames)
    const creadosFilter=creados?creados.filter(el=>el.createdInDb):console.log("NO TIENES JUEGOS CREADOS")
    console.log(creadosFilter)


    return(
    <div>
                {creadosFilter.length>0?
                <div>
                <Link to='/home' className='tituloV'>HOME</Link>
                <h1 className='titulo1'>HENRY GAME ZONE</h1>
                    {creadosFilter?.map((creado)=>{
                   return(
                       <div className='cartas'>        
                           
                                   <Card 
                                       
                                       name= {<Link to={`/videogame/${creado.id}`}>{creado.name}</Link>}
                                       id={creado.id}
                                       image={creado.image}
                                       genres={creado.genres}
                                       rating={creado.rating}  
                                       /> 
                                
                                
            </div>)})
}</div>
  :  <div>(
         <div><img className='bowser' src={"https://giffiles.alphacoders.com/620/6203.gif"} alt={"Not Found"}  /></div>
         <div className='opcionesFav'>NO TIENES VIDEOJUEGOS CREADOS</div>
                    <Link to='/home' className='texto'>HOME</Link>)</div>

         }
</div>)}