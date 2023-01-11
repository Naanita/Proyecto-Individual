import React from "react";
import "./paginado.css"
export default function Paginado({ videogamesPerPage, allVideogames, paginado}) {
    const pageNumbers = [] //declaro un arreglo vacio

    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) { //todos los videojuegos dividido los videojuegos por pag que quiero
        //i = al current page el decir (1)

        pageNumbers.push(i)   //lo guardo en pageNumbers, y ya tendría un arreglo de numeros que se actualiza segun la cantidad de juegos por pagina que tenga.

    }
    return (

         <div className='pagination'>
                { pageNumbers && pageNumbers.map(number => (

                    <a className="pag-btn" onClick={() => paginado(number)} >{number}</a>
                    // cuando haga click ejecute el paginado y cambie el currente page

                  ))}
            </div>

    )
}
