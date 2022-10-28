import React, { useEffect, useState } from "react";
import FormNewProduct from "./createProduct/formNewProduct";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../../redux/action";
import { editProductForm } from "../../../redux/action";

const NewProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);

  useEffect(() => {
    dispatch(getProductDetail(productId));
    //setImage(productDetail.image);


  }, [dispatch, /*setImage, productDetail.image,*/ productId]);

  return (
    <div className="container">
      {productId !== undefined ? (
        <>
          <h1>Editar producto</h1> <hr />
          <FormNewProduct productId={productId} />
        </>
      ) : (
        <>
          <h1>Crear nuevo producto</h1> <hr />
          <FormNewProduct productDetail={productDetail} />
        </>
      )}
    </div>
  );
};

export default NewProduct;
