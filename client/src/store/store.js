import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
);

export default store;

// compose withDevTools es una libreria que permite traer de forma mas bella de traer el choriso de info ((window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__))

//lo que hacemos acá es actualizaciones asíncronas para interactuar con el Store
//Un middleware actúa como un puente entre la base de datos y  la app. En este caso específico 
//el thunk es una función que actúa como un papel porque envuelve una expresión para retrasar su evaluación.
//tambien lo que hace el thunk si la accion es un function, la invoca y es tratada con los argumento disparch y getState, despues de que la function se ejecute este (thunk) envia la acción y actulizara el state como corresponde