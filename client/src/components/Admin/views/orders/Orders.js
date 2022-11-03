import React from 'react';
import Table from "./DatatableOrders";
import { useSelector } from "react-redux";
import { getOrder } from '../../../../redux/action';
import { useDispatch } from "react-redux";
import { UilSync } from '@iconscout/react-unicons'
import './refreshButton.css';

const Orders = () => {
  const clickhandler = (name) => console.log("delete", name);
  const allOrder = useSelector((state) => state.order);
  const dispatch = useDispatch();
  console.log('order', allOrder)

  const handleRefresh = () => {
    dispatch(getOrder())
  };

  return (
    <div className="App">
      <div>
        <div className="refreshButton">
          <UilSync className="refresh" onClick={() => handleRefresh()} />
        </div>
        <Table data={allOrder}
          click={clickhandler}
        />
      </div>
    </div>
  );
};
export default Orders;
