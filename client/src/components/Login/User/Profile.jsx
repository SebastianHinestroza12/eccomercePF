import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "react-json-pretty/themes/monikai.css";
import FormAdress from "./FormAdress";

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <Fragment>
      {/* MODAL */}
      <FormAdress />
      {/* CARD */}
      <div style={{ width: "400px", backgroundColor:"#f8efed"}} class="card text-center container">
        <div class="d-flex justify-content-center">
          <img
            style={{ width: "150px", height: "150px" }}
            src={user.picture}
            alt={user.name}
            class="card-img-top mt-4"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">{user.nickname}</h5>
          <p class="card-text">{user.email}</p>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Añade dirección de envío
          </button>

        </div>
      </div>
    </Fragment>
  ) : (
   
      <h2>NECESITAS LOGUEARTE !!</h2>
 
  );
}

export default Profile;