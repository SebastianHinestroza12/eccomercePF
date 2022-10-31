import React from 'react';
import Table from "./DatatableOrders";
import { useSelector } from "react-redux";

const Orders = () => {
  const clickhandler = (name) => console.log("delete", name);
  const allOrder = useSelector((state) => state.order);
  console.log('order', allOrder)
  return (
    <div className="App">
      <div>
        <Table data={allOrder.map(el => {
          return (
            {
              client: el.client,
              products: el.products,
              total_purchase: `$${el.total_purchase}`,
              status: el.status,
              date: el.createdAt.slice(0, 10)
            }
          )
        })}
          click={clickhandler}
        />
      </div>
    </div>
  );
};
export default Orders;
