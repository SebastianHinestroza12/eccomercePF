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
  const addedToCart = useSelector(
    (state) => state.quantityProductsAdded
  );

  let subtotal = 0
  if (productsInTheCart) {
    for (let i=0; i<productsInTheCart.length; i++){
      subtotal += productsInTheCart[i].price * productsInTheCart[i].quantity
    }
  }

  let impuestos = 0
  if (productsInTheCart) {
    impuestos = Math.floor(subtotal * 0.2)
  }
  
  let totalPrice = 0
  if (subtotal > 0) {
    totalPrice = subtotal + impuestos
  }
  
  /*

  productsInTheCart.forEach(funciton(item)){
    subtotal+=productsInTheCart[item].quantity * productsInTheCart[item].price;
  */
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
                        addedToCart={addedToCart}
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
                  <span>$ {subtotal}</span>
                </div>
                <div className="item-totals">
                  Impuestos
                  <span>$ {impuestos}</span>
                </div>
                <div className="item-totals">
                  Total
                  <span>$ {totalPrice}</span>
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
