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
  console.log(productsInTheCart.items)
  const productDetail = useSelector((state) => state.productDetail);
  const addedToCart = useSelector((state) => state.quantityProductsAdded);
  let total = 0;

  function getTotalProducts() {
    if (productsInTheCart?.length) {
      for (let element of productsInTheCart) {
        total += element.price * element.units;
      }
      return total;
    } else {
      return total;
    }
  }
  /*
  console.log(productsInTheCart)
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

  const currentUser = useSelector((state) => state.user);
  function removeItemFromCartDb(productId, size, email) {
    //remove from db
    new Promise((res, rej) => {
      res(dispatch(RemoveItemFromCartDb(productId, size, email)));
    }).then(() => {
      dispatch(getCartDetail(currentUser.email));
    });
  }

  function removeItemFromCart(index, quantity) {
    dispatch(RemoveItemFromCart(index, quantity));
  }

  useEffect(() => {
    //setTotal(totalPrice);
    //dispatch(getCartTotal(totalPrice));
    dispatch(getCartDetail(currentUser.email));
  }, [dispatch, getCartDetail]);

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
          {isAuthenticated && productsInTheCart.items?.length ? (
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
                {productsInTheCart.items?.map((element, index) => (
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
                      <p>Talla: {element.size}</p>
                    </td>
                    <td>$ {element.price.toLocaleString("en-US")}</td>
                    <td>
                      <ItemCount
                        productId={element.productId}
                        size={element.size}
                        email={currentUser.email}
                        productDetail={element}
                        quantity={element.units}
                        addedToCart={addedToCart}
                        carrito="true"
                        stock={productsInTheCart.items}
                        index={index}
                      />
                    </td>
                    <td>${TotalPrice(element.price, element.units)}</td>
                    <td>
                      <div
                        onClick={() =>
                          //removeItemFromCart(index, element.quantity)
                          removeItemFromCartDb(
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
          ) : //user not logged
          productsInTheCart?.length === 0 || productsInTheCart.items?.length === 0 ? (
            <div className="cart-empty">
              <p>No hay productos en el carrito</p>
              <div>
                <Link to="/store" className="buy btn btn-primary buttons-cart">
                  <Unicons.UilArrowLeft />
                  VOLVER A LA TIENDA
                </Link>
              </div>
            </div>
          ) : (
            <Table responsive>
              {console.log("not logged")}
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
                      <p>Talla: {element.size}</p>
                    </td>
                    <td>$ {element.price.toLocaleString("en-US")}</td>
                    <td>
                      <ItemCount
                        productDetail={element}
                        quantity={element.units}
                        addedToCart={addedToCart}
                        carrito="true"
                        stock={productsInTheCart.items}
                        index={index}
                      />
                    </td>
                    <td>${TotalPrice(element.subtotal, element.units)}</td>
                    <td>
                      <div
                        onClick={() =>
                          //removeItemFromCart(index, element.quantity)
                          removeItemFromCart(index, element.units)
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
          )}
          {productsInTheCart?.length || productsInTheCart.items?.length ? (
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
                      $
                      {!isAuthenticated
                        ? getTotalProducts().toLocaleString("en-US")
                        : productsInTheCart.totalPrice}
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
