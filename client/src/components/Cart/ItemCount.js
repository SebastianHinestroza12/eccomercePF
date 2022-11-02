import * as Unicons from "@iconscout/react-unicons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUnitDB,
  DecreaseQuantity,
  getCartDetail,
  IncreaseQuantity,
  removeUnitDB,
} from "../../redux/action";

const ItemCount = ({
  quantity,
  setQuantity,
  carrito,
  index,
  stock,
  productId,
  size,
  email,
}) => {
  const currentUser = useSelector((state) => state.user);

  const dispatch = useDispatch();
  let [num, setNum] = useState(0);

  function addQuantityToCart(actionButton) {
    if (!carrito) {
      if (actionButton === "minus") {
        setQuantity(quantity - 1);
      } else {
        setQuantity(quantity + 1);
      }
    } else {
      //user logged in
      if (currentUser?.email) {
        if (actionButton === "minus") {
          new Promise((res, rej) => {
            res(dispatch(removeUnitDB(productId, size, email)));
          }).then(() => {
            dispatch(getCartDetail(email));
          });
        } else {
          new Promise((res, rej) => {
            res(dispatch(addUnitDB(productId, size, email)));
          }).then(() => {
            dispatch(getCartDetail(email));
          });
        }
      } else {
        console.log("no loggeeeeeeeeeeeeed");
        if (actionButton === "minus") {
          dispatch(DecreaseQuantity(index));
        } else {
          dispatch(IncreaseQuantity(index));
        }
      }
    }
  }

  return (
    <div className="qty-box">
      <button
        className="cartButtons decrease"
        onClick={() => addQuantityToCart("minus")}
        disabled={quantity === 1}
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
        disabled={quantity === stock}
      >
        <Unicons.UilPlus />
      </button>
    </div>
  );
};
export default ItemCount;
