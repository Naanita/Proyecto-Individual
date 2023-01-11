import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getVideogames,
  filterVideogamesByGenre,
  getGenres,
  filterCreated,
  orderByName,
  orderByRating
} from "../Actions/actions";
import Card from "./card";
import Paginado from "./paginado";
import Loader from "./loader";
import SearchBar from "./Searchbar";
/////////////////////////////////////////////

import "./home.css";
///////////////

export default function Home() {
  const dispatch = useDispatch(); // tambien para afectar el estado 
  const allgames = useSelector((state) => state.videogames);
  const allGenre = useSelector(state => state.genres);

  ///////////////////////////////
  const [currentPage, setCurrentPage] = useState(1); // pagina actual (1) porque siempre voy a iniciar en la pagina 1
  const [gamePerPage, setGamePerPage] = useState(15); // cuantos videojuegos quiero tener por pagina 
  const indexOfLastGame = currentPage * gamePerPage; // indice del ultimo juego que tengo (15)
  const indexOfFristGame = indexOfLastGame - gamePerPage; // indice del primero juego - ultimo juego (0)
  const currentGames = allgames.slice(indexOfFristGame, indexOfLastGame); // personajes por pagina actual el igual a todos nuestros juegos y divide un array y/o tomar una porcion, que en este caso que tome el indice del primer juego y el ultimo juego

//ej: p1 1-----------0------------15
//    p2 2-----------15------------30

//basicamento lo que hace es ir marcando estados locales.

  const [order, setOrder] = useState(""); // para modificar el estado local
  ///////////////////////////////////////////

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);  //utilizo el seteo de la pagina para que me ayude al renderizado
  };
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]); //quiere decir que ejecutalo  siempre y cuando suceda el dispatch de Genres

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  if (!allgames.length) {
    return <Loader />;
  }

  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(getVideogames());
  // }



//los handle reciben un evento que segun el cambio que se le haga va hacerlo 

  function handleFilterGenre(e) {
    e.preventDefault();
    dispatch(filterVideogamesByGenre(e.target.value)); //esto es lo que llega por target si ej: si quiero filtrar por genero accion, el e.target.value será igual a accion, para que asi filtre correctamente, que también podría decir que es lo que llega en el payload. 
  }


  function handleFilterCreate(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value)); //lo que llega en el select: el payload
  }

  function handleSort(e) {
    //dispatch del asc y desc
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); // que se muestre en la pagina actual (en la primera)
    setOrder(e.target.value); //acá se modifica para que me cambien segun el handle
  }

  function handleRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  //////////////////////////////////////////

  return (
    <div className="home">
      <div>
        <Link to="/newgame">
          <button className="ButtonH">ADD GAME</button>
        </Link>
      </div>
      <div className="searchdiv">
        <SearchBar />
        </div>
        <div>
        <Paginado
          videogamesPerPage={gamePerPage}
          allVideogames={allgames.length} // length por que es necesario un valor numerico
          paginado={paginado}
        />
      </div>
        {/* <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          volver a cargar toodos los juegos{" "}
        </button> */}

{/* Es importante que cada option tenga un value, y que este sea estrictamente igual a lo que llega por la api, por eso es mejor hacer un mal directamente a lo que me llega por state, aunún tambien se puede hacer de forma manual pero recordando que debe ser estrictamente igual a la info que llega por la api*/}
      <div>
        <select
          className="select"
          onChange={(e) => handleFilterGenre(e)}
        >
          <option className="text-ignore">GENRES</option>
          <optgroup label="GENRES ⬇"></optgroup>
          <option value="All">All</option>
          {allGenre.map((g) => (
            <option key={g.name} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>

        <select className="select" onChange={(e) => handleFilterCreate(e)}>{/* el onchange quiere deicr que cuando se haga el cambio el valor de un elemento se haya cambiado este active el evento del handle que sea */}
        <option className="text-ignore">CREATED</option>
          <optgroup label="CREATED ⬇"></optgroup>
          <option value="All">All</option>
          <option value="Created">Added</option>
          <option value="Api">Existent</option>
        </select>

        <select className="select" onChange={(e) => handleSort(e)}>
        <option className="text-ignore">ORDER</option>
          <optgroup label="ORDER ⬇"></optgroup>
          <option value="Asc">A-Z</option>
          <option value="Desc">Z-A</option>
        </select>

        <select className="select"onChange={(e) => handleRating(e)}>
        <option className="text-ignore">RATING</option>
          <optgroup label="RATING ⬇"></optgroup>
          <option value="Top">Rating Top</option>
          <option value="Low">Rating Low</option>
        </select>
      </div>
{/* rederizo la card.jsx  */}
      <div className="containerc">
        {/* que me renderise los jugos segun el currenGames */}
        {currentGames && currentGames.map((g) => { 
          return (
            <Card
              id={g.id}
              name={g.name}
              image={g.image}
              genres={g.genres? g.genres : g.genres}
              key={g.id}
              rating={g.rating}
              released={g.released}
            />
          );
        })}
      </div>
    </div>
  );
}
