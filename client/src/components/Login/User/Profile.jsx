import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "react-json-pretty/themes/monikai.css";
import FormAdress from "./FormAdress";
import { useSelector } from "react-redux";
import "./css/Table.css";
import { Link } from "react-router-dom";

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const profileUser = useSelector((state) => state.user);
  console.log(profileUser.update_Data);
  console.log(isAuthenticated);
  return isAuthenticated ? (
    <Fragment>
      {/* MODAL */}
      <FormAdress />
      {/* CARD */}
      <div
        style={{ width: "400px", backgroundColor: "#f8efed" }}
        class="card text-center container"
      >
        <div class="d-flex justify-content-center">
          <img
            style={{ width: "150px", height: "150px" }}
            src={user.picture}
            alt={user.name}
            class="card-img-top mt-4"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">
            <strong>{`${user.email}`}</strong>
          </h5>

          {profileUser.update_Data ? (
            <>
              <table className="default sizeFixed">
                <tr>
                  <th>Nombre</th>
                  <td>{profileUser.update_Data.name}</td>
                </tr>

                <tr>
                  <th>Apellido</th>
                  <td>{profileUser.update_Data.surnames}</td>
                </tr>
                <tr>
                  <th>Direccion</th>
                  <td>{profileUser.update_Data.address}</td>
                </tr>
                <tr>
                  <th>Pais</th>
                  <td>{profileUser.update_Data.country}</td>
                </tr>
                <tr>
                  <th>Ciudad</th>
                  <td>{profileUser.update_Data.city}</td>
                </tr>
                <tr>
                  <th>Telefono</th>
                  <td>{profileUser.update_Data.phone}</td>
                </tr>
                <tr>
                  <th>Codigo Postal</th>
                  <td>{profileUser.update_Data.postal_code}</td>
                </tr>
                <tr>
                  <th>Dni</th>
                  <td>{profileUser.update_Data.dni}</td>
                </tr>
              </table>
              <Link to={"/store"}>
                <button
                  style={{ marginTop: "20px" }}
                  type="button"
                  class="btn btn-danger"
                >
                  Ir a la tienda
                </button>
              </Link>
            </>
          ) : (
            <button
              style={{ marginTop: "20px" }}
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Añadir datos para envio
            </button>
          )}
        </div>
      </div>
    </Fragment>
  ) : (
    <>
      <h2>NECESITAS LOGUEARTE !!</h2>
    </>
  );
}

export default Profile;
