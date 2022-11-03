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

  // function goToProduct(id) {
  //   history.push(`/product/${id}`);
  // }
  //const email = user.email;

  useEffect(() => {
    //console.log("user widget 2", currentUser.email);
    currentUser && dispatch(getCartDetail(currentUser.email));
  }, [dispatch]);

  const getTotalUnitsCart = () => {};
  return (
    <>
      <DropdownButton
        align="end"
        id="dropdown-cart"
        title={
          <span>
            <Unicons.UilShoppingCartAlt />
          </span>
        }
      >
        {console.log("productsInTheCart currentUser", [currentUser])}
        {!productsInTheCart || productsInTheCart?.length === 0 || productsInTheCart.items?.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : //if user is not logged in
        currentUser?.length === 0 ? (
          productsInTheCart.map((product, index) => (
            <Dropdown.Item
              className="listItem"
              key={index}
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
          //  console.log("logged", productsInTheCart.items)

          productsInTheCart.items?.map((product, index) => (
            <Dropdown.Item
              className="listItem"
              key={index}
              // onClick={() => goToProduct(product.idProduct)}
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
        )}

        {[productsInTheCart]?.length ? (
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