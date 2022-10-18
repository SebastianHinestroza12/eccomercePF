import * as Unicons from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import "./cartWidget.css";
import { Link } from "react-router-dom";

const CartWidget = () => {
  const quantityAddedToCart = useSelector(
    (state) => state.quantityProductsAdded
  );
  const productsInTheCart = useSelector((state) => state.cartProducts);

  return (
    <>
      <OverlayTrigger
        trigger={["click"]}
        key={"bottom"}
        placement={"bottom"}
        overlay={
          <Popover id={`popover-positioned-bottom`}>
            <Popover.Body>
              {productsInTheCart.length ? (
                productsInTheCart.map((product) => (
                  <div className="listItem" key={product.id}>
                    <img src={product.image} className="cart-image" />
                    <div className="detailsCart">
                      <span className="title">{product.name}</span>
                      <span>
                        {product.quantity} x ${product.price}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay productos en el carrito</p>
              )}
              {productsInTheCart.length ? (
                <div className="buttons-cart-group">
                  <Link
                    to="/carrito"
                    className="buy btn btn-primary buttons-cart"
                  >
                    FINALIZAR COMPRA
                  </Link>
                  <Link
                    to="/carrito"
                    className="buy btn btn-primary buttons-cart"
                  >
                    IR AL CARRITO
                  </Link>
                </div>
              ) : (
                <div></div>
              )}
            </Popover.Body>
          </Popover>
        }
      >
        <span className="navLinks nav-link carrito w-20">
          <Button className="buttonCartWidget">
            (<span>{quantityAddedToCart}</span>)
            <Unicons.UilShoppingCartAlt />
          </Button>
        </span>
      </OverlayTrigger>
    </>
  );
};
export default CartWidget;
