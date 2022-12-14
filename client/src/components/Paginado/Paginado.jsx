import React from "react";
import "./Paginado.css";

export default function Paginado({videogamesPerPage,allVideogames,paginado}){
const pageNumbers=[]

for(let i=1; i<=Math.ceil(allVideogames/videogamesPerPage); i++){
pageNumbers.push(i)
}




return (
    <nav className="lista">
        <ul className="paginado">
            {pageNumbers &&
            pageNumbers.map(number=>{
                return(
                <div className="number" key={number}>
                <button onClick={()=> paginado(number)}>{number}</button>
                </div>    
            )})}
        </ul>
    </nav>

)  
} 