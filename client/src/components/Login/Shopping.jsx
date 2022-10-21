import React from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";
import "./shopping.css";

function Shopping() {

    const estadoPedido = 'Entregado'
    const fechaCompra = '10-10-2022'
    const fechaEntrega = '15-10-2022'
    const purchasedProducts = useSelector((state) => state.cartProducts);

    function TotalPrice(price, quantity) {
      return Number(price * quantity).toLocaleString("en-US");
    }

  return (
    <Container>
      <div>
      <h2 className="cart-title">Mis compras</h2>
      <section>
        {
          purchasedProducts.length ? (
            <>
              <Table responsive>
                <thead>
                  <tr className="ter">
                    <th></th>
                    <th>Producto</th>
                    <th>Fecha de pedido</th>
                    <th>Fecha de entrega</th>
                    <th>Total</th>
                    <th></th> 
                  </tr>
                </thead>
                <div>
                  <tbody>
                  {
                  purchasedProducts.map((e, i) => (
                    <tr key={i} id={i} className="border-product">
                      <td  >
                        <img
                          style={{ width: "140px", heigth: "120px" }}
                          src={e.image}
                          className="cart-image-detail"
                          alt={e.name}
                        />
                      </td>
                      <td >
                        <p style={{ width: "200px", padding: "30px"}}>
                        {e.name}
                        </p>
                        <h6 style={{color:"#45DE48", fontWeight:"bold", width: "200px", paddingLeft: "40px"}}> {estadoPedido}</h6>
                      </td>
                      <td>
                        <p style={{fontWeight:"bold", marginRight: "175px", marginLeft: "60px", marginTop: "50px"}}>Pedido el {fechaCompra}</p>
                      </td>
                      <td>
                        <p style={{fontWeight:"bold", marginTop: "50px"}}>Llegó el {fechaEntrega}</p>
                      </td>
                      <td style={{fontWeight:"bold", marginTop: "50px", marginLeft: "180px"}}>
                        $ {TotalPrice(e.price, e.quantity)} 
                      </td>
                    </tr>
                  ))
                }
                </tbody>
                  <div>
                    <div class="card-body">      
                      <Link to="/store" className="buy btn btn-primary  buttons-cart">
                        <Unicons.UilArrowLeft />
                        VOLVER A LA TIENDA
                      </Link>
                    </div>
                  </div>
                </div>
              </Table>
          </>
          ) : (
            <>
            <div className="cart-empty">
              <p>No hay historial de compras</p>
              <div>
                <Link to="/store" className="buy btn btn-primary buttons-cart">
                  <Unicons.UilArrowLeft />
                  VOLVER A LA TIENDA
                </Link>
              </div>
            </div>
            </>
          )
        }
      </section>
        
      </div>
      </Container>
  );
}

export default Shopping;
