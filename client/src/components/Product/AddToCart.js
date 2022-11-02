import { useDispatch, useSelector } from "react-redux";
import { Button, Toast } from "react-bootstrap";
import { useState } from "react";
import { AddProductToCart, getCartDetail } from "../../redux/action";
import "./addToCart.css";
import ItemCount from "../Cart/ItemCount";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const AddToCart = ({ size, units }) => {
  //verificar is logged
  const { user } = useAuth0();

  /**ESTADOS PARA CONTROLAR EL AGREGAR O ELIMINAR CANTIDAD DEL PRODUCTO AL CARRITO */
  const [quantity, setQuantity] = useState(1);

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const product = useSelector((state) => state.productDetail);

  function addToCartButton() {
    setShow(true);
    /*if (user) {
      dispatch(
        AddProductToCart(
          { product, user: user, units: quantity, size },
          quantity,
          size,
          user.email
        )
      );
      user && dispatch(getCartDetail(user.email));*/
    new Promise((res, rej) => {
      if (user) {
        res(
          dispatch(
            AddProductToCart(
              { product, user: user, units: quantity, size },
              quantity,
              size,
              user.email
            )
          )
        );
      } else {
        res(dispatch(AddProductToCart(productDetail, quantity, size)));
      }
    }).then(() => {
      user && dispatch(getCartDetail(user.email));
    });
  }

  return (
    <>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        //containerPosition={"absolute"}
        // position={"top-end"}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Producto añadido al carrito</strong>
          <small>Ahora</small>
        </Toast.Header>
        <Toast.Body>
          <>
            {productDetail.name}&nbsp;
            <Link to={"/carrito"}>
              <span>Ver carrito</span>
            </Link>
          </>
        </Toast.Body>
      </Toast>
      <div>
        Cantidad
        <ItemCount
          productDetail={productDetail}
          quantity={quantity}
          setQuantity={setQuantity}
          size={size}
          units={units}
        />
      </div>
      <Button className="buy" onClick={() => addToCartButton()}>
        AÑADIR AL CARRITO
      </Button>
    </>
  );
};

export default AddToCart;