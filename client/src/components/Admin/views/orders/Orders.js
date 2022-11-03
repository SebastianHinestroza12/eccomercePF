import React from 'react';
import Table from "./DatatableOrders";
import { useSelector } from "react-redux";
import { getOrder } from '../../../../redux/action';
import { useDispatch } from "react-redux";
import { UilSync } from '@iconscout/react-unicons'
import './refreshButton.css';

const Orders = () => {
  const dispatch = useDispatch();
  const clickhandler = (name) => console.log("delete", name);
  const allOrder = useSelector((state) => state.order);



  const handleRefresh = () => {
    dispatch(getOrder())
  console.log('buiug')
  };

  return (
    <div className="App">
      <div>
        <div className="refreshButton">
          <UilSync className="refresh" onClick={() => handleRefresh()} />
        </div>
        <Table data={allOrder.map(el => {
          return (
            {
              numberOrder: el.id.slice(0, 8),
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
