import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCartDetail,
  getCartTotal,
  RemoveItemFromCart,
  RemoveItemFromCartDb,
} from "../../redux/action";
import { Link, useHistory } from "react-router-dom";
import ItemCount from "./ItemCount";
import * as Unicons from "@iconscout/react-unicons";
import "./cart.css";
import { useAuth0 } from "@auth0/auth0-react";

const Cart = () => {
  const { loginWithRedirect } = useAuth0();

  let history = useHistory();
  const { isAuthenticated } = useAuth0();

  const dispatch = useDispatch();
  /**ESTADOS PARA CONTROLAR EL AGREGAR O ELIMINAR CANTIDAD DEL PRODUCTO AL CARRITO */

  function TotalPrice(price, quantity) {
    return Number(price * quantity).toLocaleString("en-US");
  }

  const productsInTheCart = useSelector((state) => state.cartProducts);
  const addedToCart = useSelector((state) => state.quantityProductsAdded);

  /*
  let subtotal = 0;
  if ([productsInTheCart].length) {
    console.log("productsInTheCart items", productsInTheCart.items);
    for (let i = 0; i < productsInTheCart.items.length; i++) {
      subtotal +=
        productsInTheCart.items[i].price * productsInTheCart.items[i].units;
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
*/
  function removeItemFromCart(productId, size, email) {
    dispatch(RemoveItemFromCartDb(productId, size, email));
  }

  const currentUser = useSelector((state) => state.user);
  useEffect(() => {
    //setTotal(totalPrice);
    //dispatch(getCartTotal(totalPrice));
    dispatch(getCartDetail(currentUser.email));
    console.log("dispatch cart detail");
  }, [dispatch]);

  /*
  function loginWithRedirect() {
    if (isAuthenticated) {
      history.push("/pagar");
    } else {
      history.push("/pagar");
    }
  }*/

  return (
    <>
      <Container>
        <h2 className="cart-title">Mi carrito</h2>
        <section>
          {console.log("productsInTheCart", productsInTheCart)}
          {productsInTheCart.status === "Active" ? (
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
                {productsInTheCart.items.map((element, index) => (
                  <tr key={index} id={index}>
                    <td>
                      {console.log("element", element)}
                      <img
                        src={element.image}
                        className="cart-image-detail"
                        alt={element.name}
                      />
                    </td>
                    <td>
                      {element.name}
                      <p>Talla: {element.size || element.sizePicked}</p>
                    </td>
                    <td>$ {element.price.toLocaleString("en-US")}</td>
                    <td>
                      <ItemCount
                        productDetail={element}
                        quantity={element.units}
                        addedToCart={addedToCart}
                        carrito="true"
                        index={index}
                      />
                    </td>
                    <td>
                      ${" "}
                      {
                        TotalPrice(element.price, element.units)
                        //TotalPrice(element.price, element.quantity)
                      }{" "}
                    </td>
                    <td>
                      <div
                        onClick={() =>
                          //removeItemFromCart(index, element.quantity)
                          removeItemFromCart(
                            element.productId,
                            element.size,
                            currentUser.email
                          )
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
          {productsInTheCart.status === "Active" &&
          [productsInTheCart].length ? (
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
                    Total
                    <span>
                      $ {productsInTheCart.totalPrice.toLocaleString("en-US")}
                    </span>
                  </div>
                </div>
                {isAuthenticated ? (
                  <Link to={`/pagar`}>
                    <button
                      className="checkout buy btn btn-primary buttons-cart"
                      type="button"
                      //onClick={() => loginWithRedirect()}
                    >
                      <Unicons.UilCreditCard />
                      &nbsp;FINALIZAR COMPRA
                    </button>
                  </Link>
                ) : (
                  <Link to={`/login`} className="">
                    <button
                      className="checkout buy btn btn-primary buttons-cart"
                      type="button"
                      onClick={() => loginWithRedirect()}
                    >
                      <Unicons.UilCreditCard />
                      &nbsp;FINALIZAR COMPRA
                    </button>
                  </Link>
                )}
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
