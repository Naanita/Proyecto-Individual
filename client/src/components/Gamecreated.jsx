import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import { Link } from "react-router-dom";
import { postVideogame, getGenres, getPlatforms, getVideogames } from "../Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "./gamecreated.css";

function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Game Name is required";
    } else if (input.name.length < 4) {
      errors.name = "Game Name must have at least 4 characters";
    }
    if (!input.description) {
      errors.description = "Description is required";
    } else if (input.description.length < 8) {
      errors.description = "Description must have at least 8 characters";
    }
    if (!input.rating) {
      errors.rating = "Rating is required";
    } else if (!/^[1-5]$/.test(input.rating)) { //un numero entre 1 y 5, no letras 
      errors.rating = "Rating must be between 1 and 5";
    }
    return errors;
  };


export default function VideogameCreate() {
    const dispatch = useDispatch();
      const history = useHistory(); // para que devuelva a la mi route /home
    const genre = useSelector((state) => state.genres); //traigo mis generos
    const platform = useSelector((state) => state.platforms); //traigo las plataformas
    const [errors, setErrors] = useState({}); //setear los errores

    const [input, setInput] = useState({ //lo que necesita el post 
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [], //arreglo para que deje colocar multiples 
        platforms: [],
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value, //name se refiere a cada casillero q tiene que llenar, por eso en el form aparece name en todos
        }); // el value son los inputs de arriba que van a ir cambiando de valor a medida q la persona ingrse los datos
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
        //     console.log(input)
    }

    function handleSelectGenre(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value],
        });
    }

    function handleSelectPlatform(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value],
        });
    }

    function handleSubmit(e) { //solo y cuando las validaciones se cumnplan ejecuta el handle
        e.preventDefault()
        if (!input.name) {return alert('Name is required')}
        if (!input.rating) {return alert('Rating is required')}
        if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating) || 
           input.rating <0 || input.rating >5) 
           {return alert('Wrong format for Rating. Should be a number between 0-5')
        }
        if(!input.genres.length){return alert("genre is required")}
        if (!input.platforms.length) {return alert('Platform is required')}
        dispatch(postVideogame(input))
        dispatch(getVideogames())
        alert(`Videogame ${input.name} has been added`)
        setInput({
           name: '',
           description: '',
           reldate: '',
           rating:"",
           platform: [],
           genre: []
        })
        history.push('/home')//que me maande al home cuando ya e haya creado con exito
    }

    function handleDeletePlatform(e) {
        setInput({
            ...input,
            platforms: input.platforms.filter((p) => p !== e),
        });
    }

    function handleDeleteGenre(e) {
        setInput({
            ...input, //me traigo el estado anterior, osea todo lo que ya tenga arriba
            genres: input.genres.filter(g => g !==e), //filtrar por todo lo que NO sea ese elemento, devuelve un estado nuevo sin lo que yo clickee 
        });
    }

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);
 //me lo traigo para que al momento de abrir el selecte haya informacion elegible
    useEffect(() => {
        dispatch(getPlatforms());
    }, [dispatch]);
    return (
        <>
            <div className="color">
                <Link to="/home">
                    <button className="ButtonGameCrated">HOME</button>
                </Link>
                <h1 className="TextCreated">¡ADD YOUR GAME!</h1>
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="textbox">
                        <input
                            required // esta en true de forma automatica, que es obligatorio 
                            spellCheck="false" // no tiene que ser verificado por errores de deletreo 
                            placeholder="Name of the game"
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                        />
                        <snap className="icon"></snap>
                        <snap className="asterix">*</snap>
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className="textbox">
                        <input
                            required
                            spellCheck="false"
                            placeholder="game image in htpps"
                            type="img"
                            value={input.image}
                            name="image"
                            alt="not found"
                            onChange={(e) => handleChange(e)}
                        />
                        <snap className="icon"></snap>
                        <snap className="asterix">*</snap>
                    </div>
                    <div className="textbox">
                        <input
                            required
                            spellCheck="false"
                            placeholder="description of the game"
                            type="text"
                            value={input.description}
                            name="description"
                            onChange={(e) => handleChange(e)}
                        />
                        <snap className="icon"></snap>
                        <snap className="asterix">*</snap>
                        {errors.description && (
                            <p className="error">{errors.description}</p>
                        )}
                    </div>
                    <div className="textboxReleased">
                        <p>
                            {" "}
                            <strong>Released</strong>{" "}
                        </p>
                        <input
                            required
                            spellCheck="false"
                            type="date"
                            value={input.released}
                            name="released"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="textboxRating">
                        <p>
                            <strong>Rating</strong>
                        </p>
                        <input
                            required
                            spellCheck="false"
                            placeholder="0 to 5"
                            type="number"
                            value={input.rating}
                            min={0}
                            max={5}
                            name="rating"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.rating && <p className="error">{errors.rating}</p>}
                    </div>
                    <div className="textboxGenres">
                        <select
                            className="selectCreated"
                            onChange={(e) => handleSelectGenre(e)}
                        >
                            <option className="text-ignore">GENRES </option>
                            <optgroup label="GENRES ⬇"></optgroup>
                            {genre.map((g) => (
                                <option key={g.name} value={g.name}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="textboxGenres">
                        <select
                            className="selectCreated"
                            onChange={(e) => handleSelectPlatform(e)}
                        >
                            <option className="text-ignore">PLATFORMS</option>
                            <optgroup label="PLATFORMS ⬇"></optgroup>
                            {platform.map((p) => (
                                <option key={p.name} value={p.name}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button className="ButtonGameCrated" type="submit">
                            CREATE
                        </button>
                    </div>
                </form>
                {input.genres.map((g) => (
                    <div>
                        <label>{g}</label>
                        <button
                            className="CloseButton"
                            onClick={() => handleDeleteGenre(g)}
                        >
                            ⛔
                        </button>
                    </div>
                ))}
                {input.platforms.map((p) => (
                    <div>
                        <label>{p}</label>
                        <button
                            className="CloseButton"
                            onClick={() => handleDeletePlatform(p)}
                        >
                            ⛔
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
