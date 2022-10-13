import React, { Fragment } from "react";
import logo from "../Landing/logo.png";
import "../Landing/landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <Fragment>
      <div className="divTop">
        <img src={logo} alt="" />
      </div>
      <div className="cajaDivs">
        <div className="div1">
          <Link to={'/store'}>
            <button className="boton">Entrar</button>
          </Link>
        </div>
        <div className="div2">
          <h1 className="texto1">Qatar World Cup</h1>
          <h2 className="texto2">sporting goods</h2>
        </div>
      </div>
    </Fragment>
  );
}

export default Landing;
