import { Container, Table } from "react-bootstrap";
import * as Unicons from "@iconscout/react-unicons";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { useEffect, useState } from "react";
import "./cart.css";

const Cart = () => {
  /**ESTADOS PARA CONTROLAR EL AGREGAR O ELIMINAR CANTIDAD DEL PRODUCTO AL CARRITO */

  let TotalCart = 0;

  const [quantity, setQuantity] = useState();
  const [total, setTotal] = useState();

  function TotalPrice(price, quantity) {
    return Number(price * quantity).toLocaleString("en-US");
  }
  const productsInTheCart = useSelector((state) => state.cartProducts);

  useEffect(() => {}, []);

  return (
    <>
      <Container>
        <h2 className="cart-title">Mi carrito</h2>
        <section>
          {productsInTheCart.length ? (
            <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {productsInTheCart.map((element, index) => (
                  <tr key={index} id={index}>
                    <td>
                      <img src={element.image} className="cart-image-detail" />
                    </td>
                    <td>{element.name}</td>
                    <td>$ {element.price.toLocaleString("en-US")}</td>
                    <td>
                      <ItemCount
                        productDetail={element}
                        quantity={element.quantity}
                        setQuantity={setQuantity}
                        carrito="true"
                        index={index}
                      />
                    </td>
                    <td>$ {TotalPrice(element.price, element.quantity)} </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="cart-empty">
              No hay productos en el carrito
              <div>
                <Link to="/store" className="buy btn btn-primary buttons-cart">
                  <Unicons.UilArrowLeft />
                  VOLVER A LA TIENDA
                </Link>
              </div>
            </div>
          )}
          {productsInTheCart.length ? (
            <section className="totals-cart">
              <div>
                <Link to="/store" className="buy btn btn-primary buttons-cart">
                  <Unicons.UilArrowLeft />
                  SEGUIR COMPRANDO
                </Link>
              </div>
              <div className="totals">
                <div className="item-totals">
                  Subtotal
                  <span>$</span>
                </div>
                <div className="item-totals">
                  Impuestos
                  <span>$</span>
                </div>
              </div>
            </section>
          ) : (
            <span></span>
          )}
        </section>
      </Container>
    </>
  );
};
export default Cart;
