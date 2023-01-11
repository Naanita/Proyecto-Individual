import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../Actions/actions";
import { useEffect } from "react";
import "./detail.css";


export default function Details(props) {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getDetails(props.match.params.id)); //tambien puedo implementar una nuenva const {id} = useParams() y getDetail(id), un pabada 

  }, [dispatch]);


  const detail = useSelector((state) => state.detail);

  function handleReset() {
    dispatch(getDetails());

  }


  return (
    <div className="All">
      <Link to={"/home"} onClick={handleReset}>
        <button className="ButtonGameD">HOME</button>
      </Link>
      <div className="Card">
        <div class="card__publication">
          <img
            src={
              detail.background_image ? detail.background_image : detail.image
            }
            alt=""
          />
          <div>
            <span class="card__author">
              <i class="txt"> Released: {detail.released}</i>
            </span>
          </div>
        </div>
        <div class="card__info">
            <h2 class="card__title">{detail.name}</h2>
            <p class="card__description">
            {detail.description}
            </p>
            
            <p className="p">
            <strong>Platforms: </strong>  
                    {detail.id?.length // si existe un juego {id}
                     ? detail.platforms?.map(p => p.name).join(", ")
                     : detail.platforms?.map(p => p.platform.name).join(", ")}
                </p>
                <p className="p"><strong>Genres: </strong> {detail.genres?.map(g => g.name).join(",")}</p>
                <p>{detail.rating}🎖️</p>
        </div> 
      </div> 
    </div> 
  );
}
