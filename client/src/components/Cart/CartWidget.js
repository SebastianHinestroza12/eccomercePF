import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./cartWidget.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getCartDetail } from "../../redux/action";
import { useAuth0 } from "@auth0/auth0-react";

const totalUnitsCart = 0;
let i = 0;

const CartWidget = () => {
  const { user } = useAuth0();

  const dispatch = useDispatch();
  let history = useHistory();

  const quantityAddedToCart = useSelector(
    (state) => state.quantityProductsAdded
  );
  const productsInTheCart = useSelector((state) => state.cartProducts);
  const currentUser = useSelector((state) => state.user);

  function goToProduct(id) {
    history.push(`/product/${id}`);
  }
  //const email = user.email;

  useEffect(() => {
    //console.log("user widget 2", currentUser.email);
    currentUser && dispatch(getCartDetail(currentUser.email));
  }, [dispatch, currentUser]);

  const getTotalUnitsCart = () => {};
  return (
    <>
      <DropdownButton
        align="end"
        id="dropdown-cart"
        title={<Unicons.UilShoppingCartAlt />}
      >
        {console.log("productsInTheCart cartwidget", productsInTheCart)}
        {productsInTheCart?.length ? (
          productsInTheCart.items.map((product) => (
            <Dropdown.Item
              className="listItem"
              key={product.id}
              onClick={() => goToProduct(product.id)}
            >
              <img
                src={product.image}
                className="cart-image"
                alt={product.name}
              />
              <div className="detailsCart">
                <span className="title">{product.name}</span>
                <span className="">Talla: {product.size}</span>

                <span>
                  {product.units} unds. x ${product.price}
                </span>
              </div>
            </Dropdown.Item>
          ))
        ) : (
          <p>No hay productos en el carrito</p>
        )}
        {productsInTheCart?.length ? (
          <div className="buttons-cart-group">
            <Link to="/pagar" className="buy btn btn-primary buttons-cart">
              FINALIZAR COMPRA
            </Link>
            <Link to="/carrito" className="buy btn btn-primary buttons-cart">
              IR AL CARRITO
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </DropdownButton>
    </>
  );
};
export default CartWidget;
