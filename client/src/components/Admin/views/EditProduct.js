import React, { useEffect, useState } from "react";
import FormEditProduct from "./editProduct/formEditProduct";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, cleanProductDetail } from "../../../redux/action";
import { editProductForm } from "../../../redux/action";

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);

  useEffect(() => {
    //dispatch(getProductDetail(productId));
    //setImage(productDetail.image);


  }, [dispatch, /*setImage, productDetail.image,*/ productId]);

  return (
    <div className="container">
          <h1>Editar producto</h1> <hr />
          <FormEditProduct productDetail={productDetail} productId={productId} />
    </div>
  );
};

export default EditProduct;
