import * as Unicons from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./cartWidget.css";
import { Link, useHistory } from "react-router-dom";

const CartWidget = () => {
  let history = useHistory();

  const quantityAddedToCart = useSelector(
    (state) => state.quantityProductsAdded
  );
  const productsInTheCart = useSelector((state) => state.cartProducts);

  function goToProduct(id) {
    history.push(`/store/${id}`);
  }

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
                <span className="">Talla: {product.sizePicked}</span>

                <span>
                  {product.quantity} unds. x ${product.price}
                </span>
              </div>
            </Dropdown.Item>
          ))
        ) : (
          <p>No hay productos en el carrito</p>
        )}
        {productsInTheCart.length ? (

          /*<Dropdown.Item className="buttons-cart-group">
            <div to="/carrito" className="buy btn btn-primary buttons-cart">
              FINALIZAR COMPRA
            </div>
            <div to="/carrito" className="buy btn btn-primary buttons-cart">
              IR AL CARRITO
            </div>
          </Dropdown.Item>*/

          <div className="d-flex justify-content-center bg-light mb-3">
            <Link to="/carrito" className="mx-2 buy btn btn-primary buttons-cart">FINALIZAR COMPRA</Link>
            <Link to="/carrito" className="mx-2 buy btn btn-primary buttons-cart">IR AL CARRITO</Link>
          </div>
        ) : (
          <div></div>
        )}
      </DropdownButton>
    </>
  );
};
export default CartWidget;
