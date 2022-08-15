import React,{useState} from "react";



export const Paginacion=({currentPage,setCurrentPage,maximo})=>{
console.log(currentPage)

const[input,setInput]=useState(1);


const nextPage=()=>{
    setInput(input+1);
    setCurrentPage(currentPage+1)
}

const previousPage=()=>{
    setInput(input-1);
    setCurrentPage(currentPage-1)
}


return(
<div>
<button onClick={previousPage}>Anterior</button>
<button onClick={nextPage}>Siguiente</button>

hola
</div>


)}