import React  from "react";
import { Link } from "react-router-dom";
import "./Landingpage.css"
//el LINK es un hook, el cual ppodemos implementamos para hacer la  navegación entre componentes, enviando valores como parámetros o estados

export default function Landingpage(){
    return(
        

        <div className="Landing">
            <h1 className="Text">WELCOME</h1>
            <Link to="/home">
            <button className="Button">PRESS TO START</button>
            </Link>
        </div>

    )
}