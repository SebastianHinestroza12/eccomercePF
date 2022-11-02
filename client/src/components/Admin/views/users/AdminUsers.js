import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "./jsonUsers";
import Table from "./DataTableUsers";
import { getUsers } from "../../../../redux/action";


const AdminReviews = () => {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.newUsers);
  
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
  const clickhandler = (name) => console.log("delete", name);

  if(users) 
  return (
    <div className="App">
    
      <div>
        
        <Table  data={users} click={clickhandler} />
      </div>
    </div>
  );else{
    return null
  }
};
export default AdminReviews;
