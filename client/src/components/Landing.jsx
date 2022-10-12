import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../css/Landing.css";

function Landing() {
  return (
    <>
      <div style={{ padding: "25px", background: "#2b2b2b" }}>
        <img src={logo} alt="logo qatar" />
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-3">
            <Link to="./home">
              <button className="boton">Entrar</button>
            </Link>
          </div>
          <div class="col-2"></div>
          <div class="col-7 vh-100" style={{ background: "#2075d8" }}>
            <h1
              class="text-white text-end me-5 mt-4"
              style={{ fontFamily: "Stick No Bills", fontSize: "50px" }}
            >
              Qatar World Cup
            </h1>
            <h2
              class="text-white text-end me-5"
              style={{ fontFamily: "Stick No Bills", fontSize: "40px" }}
            >
              sporting goods
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
