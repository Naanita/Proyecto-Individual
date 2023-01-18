import axios from 'axios';



//acá es donde inicia el puente Y/O conexion de union entre el back y el front
//importo axios que es el que hace las llamadas asincronicas 


export function getVideogames(){
    return async function(dispatch){
        var games = await axios.get("/videogame")
            
            return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: games.data

        })
    }
    // el dispatch recibe y envía un objeto que describe los cambios que queremos hacer, en este caso los objetos serian nuestras actions 
    // ya que estos contienen una propiedad type, que identifica el tipo de evento que se realizará.
};

export function getVideogameName(name) {
    return async function(dispatch) {
    try {
        var gameN = await axios.get('videogame?gName=' + name);

        return dispatch ({
            type: 'GET_VIDEOGAME_NAME',
            payload: gameN.data  //es lo que devuelve la ruta una vez que le asigno algo por name
        })
    } catch (error) {
        alert('Game not found 😕'); //404
    }

    }
}   

export function getGenres(){
    return async function(dispatch){
        var json = await axios.get('genre/'); 

        return dispatch({
            type:'GET_GENRES',
            payload: json.data
        })
    }
};

export function getPlatforms() {
    return async function(dispatch) {
        const info = await axios.get('platforms');
        dispatch({
            type: 'GET_PLATFORMS',
            payload: info.data
        })
    }
};


export function getDetails(id) {
    if (id) { 
        return async function (dispatch) {
            try {
                const details = await axios.get(`videogame/${id}`)
                dispatch ({
                    type: 'GET_DETAILS',
                    payload: details.data
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
    return {
        type: 'RESET',
    }
};

export function postVideogame(payload) {
    return async function (dispatch) {
        const response = await axios.post('videogame', payload);
        
           
        return response;
    }
}

export function filterVideogamesByGenre(payload) { //el payload es el value del input <option>
    return  {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterCreated(payload) { //db
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload) { //asc y desc 
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function orderByRating(payload) {
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}

