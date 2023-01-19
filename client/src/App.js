
import "./App.css";
import { BrowserRouter,Route,Switch } from "react-router-dom";
import Landingpage from "./components/landingpage"
import Home  from "./components/home";
import Gamecreated from "./components/Gamecreated"
import Details from "./components/Detail";
import axios from 'axios';
axios.defaults.baseURL= 'https://apiGames.up.railway.app/';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* el Switch hace un ruteo segun las routes que tengamos */}
        <Switch>
        {/* el  exact path es un valor de tipo booleano para definir si queremos que la ruta tiene o no que ser exacta para renderizar un componente. */}
          <Route exact path= "/" component = {Landingpage}/>
          <Route path= "/home" component={Home}/>
          <Route path="/newgame" component={Gamecreated}/>
          <Route path= '/game/:id' component={Details}/>
        </Switch>
      </div>
    </BrowserRouter>

    //acá es donde se renderizan todas las rutas 
  );
}

export default App;
