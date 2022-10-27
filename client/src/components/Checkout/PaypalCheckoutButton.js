import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postOrder } from "../../redux/action";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

const PaypalCheckoutButton = ({ product, inputErrors }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState();
  const productsInTheCart = useSelector((state) => state.cartProducts);
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
      history.push("/");
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
      {console.log("inputErrors", inputErrors)}
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
          console.log("DataOrden", order);
          if (order.status === "COMPLETED") {
            localStorage.removeItem("cartProductsAdded");
          }
          dispatch(
            postOrder({
              products: productsInTheCart.map(
                (data) => `${data.name} X ${data.quantity} Unidad`
              ),
              total_purchase: parseInt(order.purchase_units[0].amount.value),
              client: user.email,
              status: order.status,
            })
          );

          handleApprove(data.orderID);
        }}
        onCancel={() => {}}
        onError={(error) => {
          setError(error);
          console.log("Paypal error", error);
        }}
      />
    </PayPalScriptProvider>
  );
};
export default PaypalCheckoutButton;
