import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartTotal, RemoveItemFromCart } from "../../redux/action";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import * as Unicons from "@iconscout/react-unicons";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  /**ESTADOS PARA CONTROLAR EL AGREGAR O ELIMINAR CANTIDAD DEL PRODUCTO AL CARRITO */

  function TotalPrice(price, quantity) {
    return Number(price * quantity).toLocaleString("en-US");
  }

  const productsInTheCart = useSelector((state) => state.cartProducts);
  const addedToCart = useSelector((state) => state.quantityProductsAdded);

  let subtotal = 0;
  if (productsInTheCart) {
    for (let i = 0; i < productsInTheCart.length; i++) {
      subtotal += productsInTheCart[i].price * productsInTheCart[i].quantity;
    }
  }

  let impuestos = 0;
  if (productsInTheCart) {
    impuestos = Math.floor(subtotal * 0.2);
  }

  let totalPrice = 0;
  //const [total, setTotal] = useState();
  if (subtotal > 0) {
    totalPrice = subtotal + impuestos;
  }

  function removeItemFromCart(index, quantity) {
    dispatch(RemoveItemFromCart(index, quantity));
  }

  useEffect(() => {
    //setTotal(totalPrice);
    dispatch(getCartTotal(totalPrice));
  }, [totalPrice, dispatch]);

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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productsInTheCart.map((element, index) => (
                  <tr key={index} id={index}>
                    <td>
                      <img
                        src={element.image}
                        className="cart-image-detail"
                        alt={element.name}
                      />
                    </td>
                    <td>
                      {element.name}
                      <p>Talla: {element.sizePicked}</p>
                    </td>
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
                    <td>
                      <div
                        onClick={() =>
                          removeItemFromCart(index, element.quantity)
                        }
                        className="remove-item"
                      >
                        <Unicons.UilTrash />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="cart-empty">
              <p>No hay productos en el carrito</p>
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
              <div>
                <div className="totals">
                  <div className="item-totals">
                    Subtotal
                    <span>$ {subtotal.toLocaleString("en-US")}</span>
                  </div>
                  <div className="item-totals">
                    Impuestos
                    <span>$ {impuestos.toLocaleString("en-US")}</span>
                  </div>
                  <hr></hr>
                  <div className="item-totals">
                    Total
                    <span>$ {totalPrice.toLocaleString("en-US")}</span>
                  </div>
                </div>
                <Link
                  to="/pagar"
                  className="checkout buy btn btn-primary buttons-cart"
                >
                  <Unicons.UilCreditCard />
                  &nbsp;FINALIZAR COMPRA
                </Link>
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
