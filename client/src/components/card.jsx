import React from "react";
import { Link } from "react-router-dom";
import "./card.css";
export default function Card({ name, image, genres, id, rating, released }) { // traigo lo unico que necesito, aunque tambien puedo hacer un props y traer la info para renderizarlo con un props.info
  let genre = genres.map((e) => e.name); //mapeo, porque me trae objetos y necesito acceder al name unicamente
  return (
    <div className="card">
      <Link to={"/game/" + id}>
        <img className="img" src={image} alt="img game" height={173} width={306}/>
      </Link>
      <div className="description">
        <h2 className="title">{name}</h2>
        <p className="release-date" value={genre}><strong>Genre:</strong> {genre.join(", ")} </p>
        <p className="vote-average"><strong>Rating:</strong> {rating}🏅</p>
        <p className="vote-average"><strong>Released: </strong> {released} </p>
      </div>
    </div>
  );
}
