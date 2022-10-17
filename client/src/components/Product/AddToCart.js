import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { addProductToCart } from "../../redux/action";
import "./addToCart.css";

const AddToCart = () => {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const productsInTheCart = useSelector((state) => state.cartProducts);

  /**ESTADOS PARA CONTROLAR EL AGREGAR O ELIMINAR CANTIDAD DEL PRODUCTO AL CARRITO */
  const [quantity, setQuantity] = useState(0);

  function addQuantityToCart(actionButton) {
    if (actionButton === "minus") {
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  }

  function addToCartButton() {
    console.log("Agregados", quantity);
    dispatch(addProductToCart(productDetail, quantity));
  }

  return (
    <>
      {console.log("productsInTheCart", productsInTheCart)}
      <div>
        Cantidad
        <div className="qty-box">
          <button
            className="cartButtons decrease"
            onClick={() => addQuantityToCart("minus")}
            disabled={quantity === 0}
          >
            <Unicons.UilMinus />
          </button>
          <input
            type="number"
            id="quantity_6347dd6ab108a"
            className="input-text qty text"
            step="1"
            min="1"
            max=""
            name="quantity"
            value={quantity}
            title="Qty"
            size="4"
            placeholder=""
            inputMode="numeric"
            readOnly={true}
          />
          <button
            className="cartButtons increase"
            onClick={() => addQuantityToCart("plus")}
            disabled={quantity === productDetail.stock}
          >
            <Unicons.UilPlus />
          </button>
        </div>
      </div>
      <Button className="buy" onClick={() => addToCartButton()}>
        COMPRAR
      </Button>
    </>
  );
};

export default AddToCart;
