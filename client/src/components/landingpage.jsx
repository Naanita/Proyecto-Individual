import React from "react";
import { Link } from "react-router-dom";
import "./Landingpage.css";
//el LINK es un hook, el cual ppodemos implementamos para hacer la  navegación entre componentes, enviando valores como parámetros o estados

export default function Landingpage() {
  return (
    <div className="Landing">
      <h1 className="Text">WELCOME</h1>
      <Link to="/home">
        <button className="Button">PRESS TO START</button>
      </Link>
      <section className="cont">
        <ul class="social">
          <li>
            <a class="ease-all" href="https://github.com/Naanita" target="blank">
              <i aria-hidden="true"></i>
              <span class="hide-text">
                <img
                  className="img1"
                  src="https://cdn-icons-png.flaticon.com/512/779/779088.png"
                  height={30}
                  width={30}
                />
              </span>
            </a>
          </li>
          <li>
          <a class="ease-all" href="https://www.linkedin.com/in/sebasti%C3%A1n-grajales-morales-14a277212/" target="blank">
              <i aria-hidden="true"></i>
              <span class="hide-text">
                <img
                  className="img2"
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"   
                  height={25}
                  width={25}
                />
              </span>
            </a>
          </li>
          <li>
          <a class="ease-all" href="https://www.youtube.com/@sebastiangrajales6399/videos" target="blank">
              <i aria-hidden="true"></i>
              <span class="hide-text">
                <img
                  className="img3"
                  src="https://cdn-icons-png.flaticon.com/512/174/174883.png"
                  height={30}
                  width={30}
                />
              </span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
