import * as Unicons from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import {
  OverlayTrigger,
  Popover,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "./cartWidget.css";
import { Link } from "react-router-dom";

const CartWidget = () => {
  const quantityAddedToCart = useSelector(
    (state) => state.quantityProductsAdded
  );
  const productsInTheCart = useSelector((state) => state.cartProducts);

  return (
    <>
      <DropdownButton
        align="end"
        id="dropdown-cart"
        title={
          <>
            ({quantityAddedToCart}) <Unicons.UilShoppingCartAlt />
          </>
        }
      >
        {productsInTheCart.length ? (
          productsInTheCart.map((product) => (
            <Dropdown.Item className="listItem" key={product.id}>
              <img src={product.image} className="cart-image" />
              <div className="detailsCart">
                <span className="title">{product.name}</span>
                <span>
                  {product.quantity} x ${product.price}
                </span>
              </div>
            </Dropdown.Item>
          ))
        ) : (
          <p>No hay productos en el carrito</p>
        )}
        {productsInTheCart.length ? (
          <Dropdown.Item className="buttons-cart-group">
            <Link to="/carrito" className="buy btn btn-primary buttons-cart">
              FINALIZAR COMPRA
            </Link>
            <Link to="/carrito" className="buy btn btn-primary buttons-cart">
              IR AL CARRITO
            </Link>
          </Dropdown.Item>
        ) : (
          <div></div>
        )}
      </DropdownButton>
    </>
  );
};
export default CartWidget;
