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
          /**
           * PAYPAL RESPONSE
           * 
           * create_time:"2022-10-24T15:58:02Z"
                id:"3X590867BH785111R"
              intent:"CAPTURE"
              links:[{…}]
              payer:{name: {…}, email_address: 'liss-compras@personal.example.com', payer_id: '2QCYRLT3R3RVC', phone: {…}, address: {…}}
              purchase_units:[{…}]
              status:"COMPLETED"
              update_time:"2022-10-24T15:58:16Z"
           */

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
