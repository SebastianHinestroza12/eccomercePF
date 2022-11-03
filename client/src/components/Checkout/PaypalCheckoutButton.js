import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearCart, postOrder, getCartDetail } from "../../redux/action";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

const PaypalCheckoutButton = ({ product, inputErrors }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState();
  const productsInTheCart = useSelector((state) => state.cartProducts);
  console.log(productsInTheCart);
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const history = useHistory();

  const handleApprove = (orderId) => {
    setPaidFor(true);
  };

  if (paidFor) {
    Swal.fire({
      title: "Transacción exitosa!",
      icon: "success",
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    });
    setTimeout(() => {
      history.push("/shopping");
    }, 3000);
  }
  if (error) {
    Swal.fire({
      title: "Error en la transacción",
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
      showCancelButton: false,
    });
  }

  return (
    <PayPalScriptProvider>
      <PayPalButtons
        disabled={Object.entries(inputErrors).length !== 0}
        onClick={(data, actions) => {
          const hasAlreadyBoughtCourse = false;
          if (hasAlreadyBoughtCourse) {
            setError("alert");
            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: product.price,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          if (order.status === "COMPLETED") {
            localStorage.removeItem("cartProductsAdded");
          }
          dispatch(
            postOrder({
              products: productsInTheCart.items.map(
                (e) => `${e.name} X ${e.units} Unidad - Talle ${e.size}`
              ),
              total_purchase: parseInt(order.purchase_units[0].amount.value),
              client: user.email,
              status: order.status,
            })
          );
          dispatch(clearCart(user.email));
          setTimeout(() => {
            dispatch(getCartDetail(user.email));
          }, 1000);

          handleApprove(data.orderID);
        }}
        onCancel={() => {}}
        onError={(error) => {
          setError(error);
        }}
      />
    </PayPalScriptProvider>
  );
};
export default PaypalCheckoutButton;
