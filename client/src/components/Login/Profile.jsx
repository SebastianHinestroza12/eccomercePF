import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated ? (
      <div style={{width:"400px"}} class="card text-center bg-secondary">
        <div class="d-flex justify-content-center">

        <img style={{width:"150px", height:"150px"}} src={user.picture} alt={user.name} class="card-img-top mt-4" />
        </div>
        <div class="card-body">
        <h5 class="card-title">{user.nickname}</h5>
        <p class="card-text">{user.email}</p>
        <a href="#" class="btn btn-primary">Añade dirección de envío</a>
        <JSONPretty data={user} />
        </div>
      </div>
    )
    : "NECESITAS LOGUEARTE !!"

  );
}

export default Profile;