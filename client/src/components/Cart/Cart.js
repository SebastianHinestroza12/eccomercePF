import { Container, Table } from "react-bootstrap";
import * as Unicons from "@iconscout/react-unicons";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { useState } from "react";

const Cart = () => {
  /**ESTADOS PARA CONTROLAR EL AGREGAR O ELIMINAR CANTIDAD DEL PRODUCTO AL CARRITO */
  const [quantity, setQuantity] = useState();

  let subtotal = 0;
  const productsInTheCart = useSelector((state) => state.cartProducts);

  return (
    <>
      <Container>
        <h2>Mi carrito</h2>
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
                {productsInTheCart.map((element) => (
                  <tr key={element.id} id={element.id}>
                    <td>
                      <img src={element.image} className="cart-image-detail" />
                    </td>
                    <td>{element.name}</td>
                    <td>$ {element.price}</td>
                    <td>
                      <ItemCount
                        productDetail={element}
                        quantity={1}
                        setQuantity={setQuantity}
                        carrito="true"
                      />
                    </td>
                    <td>$ {element.quantity * element.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div>No hay productos en el carrito</div>
          )}
          {productsInTheCart.length ? (
            <section className="totals-cart">
              <div>
                <Link to="/store" className="buy btn btn-primary buttons-cart">
                  <Unicons.UilArrowLeft />
                  SEGUIR COMPRANDO
                </Link>
              </div>
              <div>
                <div>
                  Subtotal{" "}
                  <span>
                    $
                    {productsInTheCart.map(
                      (element) =>
                        (subtotal = subtotal + parseInt(element.price))
                    )}
                  </span>
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
