import { useDispatch, useSelector } from "react-redux";
import { Button, Toast } from "react-bootstrap";
import { useState } from "react";
import { addProductToCart } from "../../redux/action";

import "./addToCart.css";
import ItemCount from "../Cart/ItemCount";
import { Link } from "react-router-dom";

const AddToCart = ({ sizePicked, stock }) => {
  /**ESTADOS PARA CONTROLAR EL AGREGAR O ELIMINAR CANTIDAD DEL PRODUCTO AL CARRITO */
  const [quantity, setQuantity] = useState(1);

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);

  function addToCartButton() {
    setShow(true);
    dispatch(addProductToCart(productDetail, quantity, sizePicked));
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
          sizePicked={sizePicked}
          stock={stock}
        />
      </div>
      <Button className="buy" onClick={() => addToCartButton()}>
        COMPRAR
      </Button>
    </>
  );
};

export default AddToCart;
