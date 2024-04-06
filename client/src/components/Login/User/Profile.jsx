import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "react-json-pretty/themes/monikai.css";
import FormAdress from "./FormAdress";
import { useSelector } from "react-redux";
import "./css/Table.css";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  console.log('user',user)
  const profileUser = useSelector((state) => state.user);
  console.log('profile',profileUser.email);
  console.log('user',isAuthenticated);
  return isAuthenticated ? (
    <Fragment>
      {/* MODAL */}
      <FormAdress />
      {/* CARD */}
      <Row>
        <Col
          md={4}
          style={{ backgroundColor: "#f8efed" }}
          className="card text-center user-profile"
        >
          <div className="d-flex justify-content-center">
            <img
              style={{ width: "150px", height: "150px" }}
              src={user.picture}
              alt={user.name}
              className="card-img-top"
              class="img-thumbnail"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">
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
                    className="btn btn-danger"
                  >
                    Ir a la tienda
                  </button>
                </Link>
              </>
            ) : (
              <button
                style={{ marginTop: "20px" }}
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Editar mis datos
              </button>
            )}
          </div>
        </Col>

        <Col>
          <section className="data-profile m-5">
            <h3>Mis Datos</h3>
            <div>
              <strong>Nombre: </strong>
              {profileUser.name}
            </div>
            <div>
              <strong>Apellido: </strong>
              {profileUser.surnames}
            </div>
            <div>
              <strong>Correo electrónico: </strong>
              {user.email}
            </div>
            <div>
              <strong>Teléfono: </strong>
              {profileUser.phone}
            </div>
            <div>
              <strong>Dirección: </strong>
              {profileUser.address}
            </div>
            <div>
              <strong>Localidad: </strong>
              {profileUser.country}, {profileUser.city}
            </div>
            <div>
              <strong>DNI: </strong>
              {profileUser.dni}
            </div>
          </section>

          <div>{console.log("profileUser", profileUser)}</div>
        </Col>
      </Row>
    </Fragment>
  ) : (
    <>
      <h2>NECESITAS LOGUEARTE !!</h2>
    </>
  );
}

export default Profile;
