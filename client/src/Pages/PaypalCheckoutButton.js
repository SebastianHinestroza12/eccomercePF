import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

const PaypalCheckoutButton = ({ product }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState();

  const handleApprove = (orderId) => {
    setPaidFor(true);
  };

  if (paidFor) {
    alert("Gracias por su compra");
  }
  if (error) {
    alert("Error: ", error);
  }

  return (
    <PayPalScriptProvider>
      <PayPalButtons
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
                description: product.description,
                amount: {
                  value: product.price,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log("order", order);

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
