import axios from 'axios';



export function getVideogames(){
    return async function(dispatch){
        var json=await axios.get(`http://localhost:3001/videogames`,{});
        return dispatch({
            type:'GET_VIDEOGAMES',
            payload:json.data
        })
  }}



export function getNameVideogames(name){
  return async function(dispatch){
try{
    var json=await axios.get(`http://localhost:3001/videogames/?name=${name}`);
    return dispatch({
      type:'GET_BY_NAME',
      payload:json.data
    })
  }catch(error){
    console.log(error)
  }
}
};


export function getGenres(){
  return async function(dispatch){
    var info= await axios.get(`http://localhost:3001/genres`);
    return dispatch({
      type:'GET_GENRE',
      payload:info.data
    })
  }
}

export function postVideogame(payload){
  return async function(dispatch){
    var response= await axios.post('http://localhost:3001/videogame',payload)
    return response;
  }
}
  

//modificado
export function deleteVideogame(id){
  return async function(dispatch){
    var response= await axios.delete(`http://localhost:3001/videogames/${id}`)
    return response;
  }
}
  
//modificado
export function modificarVideojuego(payload){
return async function(dispatch){
  var response= await axios.put(`http://localhost:3001/videogames/`,payload)
  return response;
}
}





export function filterVideogamesByGenre(payload){
    return{
      type:'FILTER_BY_GENRE',
      payload
    }
  }


  export function filterCreated(payload){
    return{
      type:'FILTER_CREATED',
      payload
    }
  }

  export function orderByName(payload){
    return{
      type:'FILTER_NAME',
      payload
    }
  }


 



//modificado

export function orderByRating(payload){
  return{
    type:'FILTER_RATING',
    payload
  }
}

//modificado
export function addvideogameFavorite(payload){
  return{
    type:'ADD_FAVORITO',
    payload
  }
}


export function removevideogameFavorite(payload){
  return{
    type:'REMOVE_FAVORITO',
    payload
  }
}

//modificado
  
export function getDetail (id){
  return async function(dispatch){
    try{
      var json= await axios.get('http://localhost:3001/videogame/'+id);
      return dispatch({
        type:'GET_DETAILS',
        payload:json.data
      })
    }catch(error){
    console.log(error)}
  }
}

