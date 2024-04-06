import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductDetail, cleanProductDetail } from "../../../redux/action";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import Table from "./DataTable";

function AllProducts() {
  //const { productId } = useParams();

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(cleanProductDetail());

  }, [dispatch]);

  //carga de detalle
  /*useEffect(() => {
    new Promise((resolve) => {
      resolve(dispatch(getProductDetail(productId)));
    });
  }, [dispatch, productId]);*/

  const clickhandler = (name) => console.log("delete", name);

  return (
    <div className="App">
      <div>
        <Table data={products} click={clickhandler} />
      </div>
    </div>
  );
}

export default AllProducts;
