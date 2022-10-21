import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Shopping() {
  const estadoPedido = "Entregado";
  const fechaCompra = "10-10-2022";
  const fechaEntrega = "15-10-2022";
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <div class="card mb-3 mb-auto bg-secondary">
      <div class="row g-0" style={{ height: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          class="col-md-4"
        >
          <img
            style={{ width: "120px", heigth: "120px" }}
            src="https://picsum.photos/200/200"
            class="img-fluid rounded-start"
            alt="Imagen producto comprado"
          />
        </div>
        <div class="col-md-8">
          <h5 class="card-title">{fechaCompra}</h5>
          <div class="card-header">
            <h6 style={{ color: "#45DE48", fontWeight: "bold" }}>
              {estadoPedido}
            </h6>
            <p style={{ fontWeight: "bold" }}>Llegó el {fechaEntrega}</p>
          </div>
          <div class="card-body">
            <p class="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              accusantium, vitae dolorem tempora iste inventore ipsa deleniti
              iusto, quo modi expedita ea doloribus. Quos, praesentium!
              Praesentium, totam error. Autem, ipsa! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Facere accusantium, vitae dolorem
              tempora iste inventore ipsa deleniti iusto, quo modi expedita ea
              doloribus. Quos, praesentium! Praesentium, totam error. Autem,
              ipsa! Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Facere accusantium, vitae dolorem tempora iste inventore ipsa
              deleniti iusto, quo modi expedita ea doloribus. Quos, praesentium!
              Praesentium, totam error. Autem, ipsa! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Facere accusantium, vitae dolorem
              tempora iste inventore ipsa deleniti iusto, quo modi expedita ea
              doloribus. Quos, praesentium! Praesentium, totam error. Autem,
              ipsa! Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Facere accusantium, vitae dolorem tempora iste inventore ipsa
              deleniti iusto, quo modi expedita ea doloribus. Quos, praesentium!
              Praesentium, totam error. Autem, ipsa! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Facere accusantium, vitae dolorem
            </p>
            <a href="/store" class="btn btn-danger">
              Volver a comprar
            </a>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div class="container">
      <h2>NECESITAS LOGUEARTE !!</h2>
    </div>
  )
}

export default Shopping;
