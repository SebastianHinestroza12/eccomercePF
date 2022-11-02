import * as Unicons from "@iconscout/react-unicons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUnitDB, getCartDetail, removeUnitDB } from "../../redux/action";

const ItemCount = ({ quantity, setQuantity, carrito, index, stock, productId, size, email }) => {
  const dispatch = useDispatch();
  let [num, setNum] = useState(0)
  const productsInTheCart = useSelector((state) => state.cartProducts);

  const [count, setCount] = useState(0);

  //console.log("carrito", carrito);
  console.log(count);
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
        setCount(productsInTheCart.size_stock)
        setCount(count+1)
        console.log("restando");
      } else {
        console.log('si',productId, size, email)
        dispatch(addUnitDB(productId, size, email));
        dispatch(getCartDetail(email))
        setCount(count+1)
        console.log("sumando");
      }
    }
    setCount(count+1)
  }
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {

    dispatch(getCartDetail(currentUser.email));
    }, [currentUser.email, dispatch, count]
  );

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
