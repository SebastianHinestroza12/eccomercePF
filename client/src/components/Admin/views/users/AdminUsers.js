import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "./DataTableUsers";


const AdminReviews = () => {

  const dispatch = useDispatch();

//   const reviews = useSelector((state) => state.allReviews);
  
//   useEffect(() => {
//     dispatch(getUsers());
//   }, [dispatch]);
  
  const clickhandler = (name) => console.log("delete", name);

  
  return (
    <div className="App">
      <div>
        <Table  click={clickhandler} />
      </div>
    </div>
  );
};
export default AdminReviews;
