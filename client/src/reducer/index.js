const initialState={
    videogames:[],
    allVideogames:[],
    genres:[],
    detail:[],
    videogamesFavoritos:[]

}




function rootReducer(state=initialState,action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames:action.payload,
                allVideogames:action.payload
            }
//modificado
        case 'ADD_FAVORITO':{
            return{
                ...state,
                videogamesFavoritos:state.videogamesFavoritos.concat(action.payload)
            }
        }
        
        case 'REMOVE_FAVORITO':
            return{
                ...state,
                videogamesFavoritos:state.videogamesFavoritos.filter(videojuego=>videojuego.id !==action.payload)
            }    
        
 //modificado

        case 'GET_BY_NAME':
        return{
            ...state,
            videogames:action.payload //modificado
        }

        case 'GET_GENRE':{
            return{
                ...state,
                genres:action.payload

            }
        }



            case 'FILTER_BY_GENRE':
            const allVideogames=state.allVideogames
            const statusFilter=action.payload==='All'?allVideogames:allVideogames.filter((el)=>el.genres.includes(action.payload))
            return{
                ...state,
                videogames:statusFilter
           }

         


           case 'POST_VIDEOGAME':
            return{
                ...state,
            }


            case 'MODIFICAR_VIDEOJUEGO':
                return{
                    ...state,
                }


            case'DELETE_VIDEOGAME':
            return{
                ...state,
            }

                     
             case 'FILTER_CREATED':
                const allVideogames2=state.allVideogames
                const creadosFilter=action.payload==='created'?allVideogames2.filter(el=>el.createdInDb):allVideogames2.filter(el=>!el.createdInDb)
                return{
                    ...state,
                    videogames:action.payload==='All'?state.allVideogames:creadosFilter
                }






            case 'FILTER_NAME':
                let sortedArr=action.payload==='asc'?
                state.videogames.sort(function(a,b){
                if(a.name>b.name){
                    return 1;
                }  
                if(b.name>a.name){
                    return -1;
                }
                return 0;
                }):
                state.videogames.sort(function(a,b){
                    if(a.name>b.name){
                        return -1
                    }
                    if(b.name>a.name){
                        return 1;
                    }
                    return 0
                }) 
                return {
                    ...state,
                    videogames:sortedArr

                }
//modificado
                case 'FILTER_RATING':
                    let sortedPunt=action.payload==='men'?
                    state.videogames.sort(function(a,b){
                    if(a.rating>b.rating){
                        return 1;
                    }  
                    if(b.rating>a.rating){
                        return -1;
                    }
                    return 0;
                    }):
                    state.videogames.sort(function(a,b){
                        if(a.rating>b.rating){
                            return -1
                        }
                        if(b.rating>a.rating){
                            return 1;
                        }
                        return 0
                    }) 
                    return {
                        ...state,
                        videogames:sortedPunt
    
                    }




            
                case 'GET_DETAILS':
                    return{
                        ...state,
                        detail:action.payload
                    }



            default:
                return state;
         }
    }


export default rootReducer;