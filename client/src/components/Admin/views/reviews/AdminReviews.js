import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../../../redux/action";
import Table from "./DatatableReviews";
import data from "./jsonReviews";

const AdminReviews = () => {

  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.allReviews);
  
  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);
  
  const clickhandler = (name) => console.log("delete", name);

  
  return (
    <div className="App">
      <div>
        <Table data={reviews} click={clickhandler} />
      </div>
    </div>
  );
};
export default AdminReviews;
