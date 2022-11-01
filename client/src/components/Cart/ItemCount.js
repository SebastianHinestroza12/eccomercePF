import * as Unicons from "@iconscout/react-unicons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUnitDB, getCartDetail, removeUnitDB } from "../../redux/action";

const ItemCount = ({ quantity, setQuantity, carrito, index, stock, productId, size, email }) => {
  const dispatch = useDispatch();
  let [num, setNum] = useState(0)

  useEffect(() => {
    console.log("me actualizo");
  }, [dispatch]);

  function addQuantityToCart(actionButton) {
    if (!carrito) {
      if (actionButton === "minus") {
        setQuantity(quantity - 1);
      } else {
        setQuantity(quantity + 1);
      }
    } else {  
      
      if (actionButton === "minus") {
        console.log('si',productId, size, email)
        dispatch(removeUnitDB(productId, size, email));
        dispatch(getCartDetail(email))
      } else {
        console.log('si',productId, size, email)
        dispatch(addUnitDB(productId, size, email));
        dispatch(getCartDetail(email))
      }
    }
    
  }

  useEffect(() => {
    console.log("me actualizo");
  }, []);

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
