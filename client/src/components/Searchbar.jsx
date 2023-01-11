import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideogameName } from "../Actions/actions";
import "./searchbar.css";



export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // modificar el estado

  function handleImputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.length) {
      alert("Please enter a videogame");
    } else {
      dispatch(getVideogameName(name)); //name es lo q está escribiendo el usuario
      setName(""); //modifique el estado cuando busque correctante
    }
  }
  return (
    <div className="search">
      <input
        className="searchTerm"
        type="text"
        placeholder="Search Game..."
        value={name} // para que se borre despues de buscar 
        onChange={(e) => handleImputChange(e)}
      />
      <button
        type="submit"
        className="SearchButton"
        onClick={(e) => handleSubmit(e)}
      >
        🔍
      </button>
    </div>
  );
}
