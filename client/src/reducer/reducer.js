
const initialState = {
  videogames : [],
  allVideogames: [],
  genres: [],
  detail: {},
  platforms: []

}



function rootReducer(state= initialState, action){ // en esta accion mando todos los videogames al arrglo vacio, que seria nuestro initial estate 
  switch (action.type) { // swich hace que segun cada caso cambia el type, ademas, recibo la accion que será igual al type declarado en las actions 
    case "GET_VIDEOGAMES": //todo esto segun el caso, por eso es importante que sea igual 
      return {
        ...state, //mantengo lo que ya tengo en mi estado 
        videogames: action.payload, //guardo lo que me llego por payload en action en nuestro estado
        allVideogames: action.payload, //tenemos otro estado que utilizaremos como backup o respaldo, y este lo tenemos que tener ahí para utilizarlo en el caso donde necesitaremos hacer filtros para que no se consuma la solicitud

      };

    case 'GET_VIDEOGAME_NAME': //searchbar
        return {
            ...state,
            videogames: action.payload

        }

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case 'POST_VIDEOGAME':
        return{
            ...state,

        }

    case "FILTER_BY_GENRE":
      const allGames = state.allVideogames; //todos los juegos van hacer igual a el state de los juegos
      const genresFiltered =
        action.payload === "All"
          ? state.allVideogames //Si lo que llega por payload de la accion es igual al "todos" mandame toooodos los juegos del backup, de lo contrario filtrame en los juegos y en el genero y allí buscame el valor estrictamente igual al name que debe ser estrictamente igual a lo que llegue por paylad
          : allGames.filter((el) => {
              return el.genres.find((el) => {
                return el.name === action.payload;
              });
            });
      return {
        ...state,
        videogames: genresFiltered, // me traigo lo que ya tengo y convierteme el videogame en el fitrado de los juegos, donde allí se van depurando pero sin perder la info por el backup
      };


    case "FILTER_CREATED":
      const filterCreated =
        action.payload === "Created" //Si lo que llega por payload de la accion es igual al "creados" filtrame todos los juegos creados por mi (en la database) y si no filtrame esos juegos que no sean creados por mi, es decir que me traiga todo para que no rompa
          ? state.allVideogames.filter((el) => el.createdInDb)
          : state.allVideogames.filter((el) => !el.createdInDb);
      return {
        ...state, //me devuelve el estado anterior
        videogames:
          action.payload === "All" ? state.allVideogames : filterCreated, //si el payload es igual a "todos" traeme todos los juegos si no, traeme los filtrados 
      };

    case 'ORDER_BY_NAME': //orden asc y desc
        let sortName = action.payload ==='Asc'?
        state.videogames.sort(function(a, b) { //si lo que me llega por payload (que tambien podria decir que es igual a lo que puse en value en home) es igual a "Asc" entonces acede a mis estado de juegos que es el que se estar renderizando y haz un sort que es un  ordena los elementos de un arreglo localmente y devuelve el arreglo ordenado.

// entonces le colocamos que ordene a y b, entonces se pregunta si a es mayor a b (se pregunta intername compara con el que encuentra primero con el que encuentra despues) y si se cumple retorna 1, que seria la posicion 1 [[posiciones ----> 0 - 1- 2 -3...]] entonces la posicion 1 seria el a y si son iguales retorn 0, la posicion igual 
            if (a.name > b.name) {
                return 1;
            }
            if (b.name > a.name) {
                return -1;
            }
            return 0;
        })
        :state.videogames.sort(function(a, b) {
            if (a.name > b.name) {
                return -1;
            }
            if (b.name > a.name) {
              //si este es mas grande que este, devolvemos asi y si no pues al contrarip
                return 1;
            }
            return 0;
        })
        return {
            ...state,
            videogames: sortName,
        };

    case'ORDER_BY_RATING':
    let sortRating = action.payload === 'Low' ?
    state.videogames.sort(function(a, b) {
        if (a.rating > b.rating) {
            return 1;
        }
        if(b.rating > a.rating) {
            return -1;
        }
        return 0;
    })
    :state.videogames.sort(function(a, b) {
        if (a.rating > b.rating) {
            return -1;
        }
        if ( b.rating > a.rating) {
            return 1;
        }
        return 0;
    });
    return  {
        ...state,
        videogames: sortRating,
    }

    case 'GET_DETAILS':
        return {
            ...state,
            detail: action.payload
        }

    case 'GET_PLATFORMS':
        return {
            ...state,
            platforms: action.payload
        }
// let Getall= state.allVideogames
// let arr = []
// Getall.forEach(elem => elem.plataforms.forEach(el=>arr.push(el.plataforms.name)))
// const set = new Set(arr)
// let allPlataforms = Array.from(set)
// return{...state,
// plataforms: allPlataforms
// }

    default:
      return state;
  }
      };   

      
       
      

  



export default rootReducer;