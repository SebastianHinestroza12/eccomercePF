import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import axios from "axios";
import "./editProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../../../redux/action";
import { editProductForm } from "../../../../redux/action";
import { Col, Row } from "react-bootstrap";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/ddl3snuoe/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "pzsfr2g4";

let noRepeat = new Set();
const FormNewProduct = ({ productId }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState("");
  const [image, setImage] = useState("");

  const handleInputValue = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setImage(res.data.secure_url);
    setValue("image", res.data.secure_url);
  };

  const productDetail = useSelector((state) => state.productDetail);

  console.log(productDetail);


  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      id: productId,
      image: "",
      name: "",
      category: productDetail.categories ? productDetail.categories[0].name : false,
      price: "",
      status: "",
      size_stock: productDetail.size_stock,
      detail: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "size_stock",
  });

  const selectValidator = (value) => {
    return value !== "---";
  };

  const value = (e) => {
    setValues(e.target.value);
    noRepeat.clear();
  };

  const onSubmit = (data) => {
    dispatch(editProductForm(data));
    reset();
  };

  useEffect(() => {
    dispatch(getProductDetail(productId));
    //setImage(productDetail.image);


  }, [dispatch, /*setImage, productDetail.image,*/ productId]);

  function fillInputs(productDetail) {
    setValue("name", productDetail.name);
    setValue("price", productDetail.price);
    setValue("detail", productDetail.detail);
    setValue("image", productDetail.image);
    setValue("category", productDetail.categories ? productDetail.categories[0].name : false);
    setValue("status", productDetail.visible ? "Publicado" : "Borrador");
  }
  
  return (
    <>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        {[productDetail].length > 0 && fillInputs(productDetail)}
        <Row className="new-product">
          <Col md={8}>
            <div>
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                id="name"
                className="form-control"
                type="text"
                {...register("name", {
                  required: true,
                  maxLength: 50,
                })}
              />
              {errors.name?.type === "required" && (
                <p className="textoError">El campo Nombre es requerido</p>
              )}
              {errors.name?.type === "maxLength" && (
                <p className="textoError">Máximo de carácteres permitidos</p>
              )}
            </div>
            <div>
              <label htmlFor="price" className="form-label">
                Precio
              </label>
              <input
                className="form-control"
                type="text"
                id="price"
                {...register("price", {
                  required: true,
                  pattern: /^-?\d*(\.\d+)?$/,
                })}
              />
              {errors.price?.type === "required" && (
                <p className="textoError">El campo Precio es requerido</p>
              )}
              {errors.price?.type === "pattern" && (
                <p className="textoError">Sólo números permitidos</p>
              )}
            </div>
            <div>
              <div>
                <label>Detalles</label>

                <textarea
                  rows={10}
                  className="form-control"
                  placeholder=""
                  id="floatingTextarea"
                  {...register("detail", {
                    required: true,
                  })}
                ></textarea>
                {errors.detail?.type === "required" && (
                  <p className="textoError">El campo Detalles es requerido</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="category" className="form-label">
                Categoría
              </label>
              <select
                onClick={value}
                name="category"
                id="category"
                aria-label="Default select example"
                {...register("category", {
                  validate: selectValidator,
                })}
              >
                <option selected disabled hidden>{productDetail.categories ? productDetail.categories[0].name : false}</option>
                <option value="Jersey">Jersey</option>
                <option value="Balon">Balon</option>
                <option value="Calzado">Calzado</option>
                <option value="Short">Short</option>
              </select>
              {errors.category && (
                <p className="textoError">Debes seleccionar una opción</p>
              )}
            </div>
            <div>
              <label>Talla y stock:</label>
              {fields.map((field, index) => {
                return (
                  <li className="size-stock" key={field.id}>
                    <Controller
                      render={({ field }) => (
                        <input {...field} className="form-control" />
                      )}
                      name={`size_stock.${index}.size`}
                      control={control}
                    />

                    {errors.size && (
                      <p className="textoError">Debes seleccionar una opción</p>
                    )}

                    <Controller
                      render={({ field }) => (
                        <input {...field} className="form-control" />
                      )}
                      name={`size_stock.${index}.stock`}
                      control={control}
                    />
                    <button
                      type="button"
                      className="remove-item btn btn-danger"
                      onClick={() => remove(index)}
                    >
                      <Unicons.UilTrash />
                    </button>
                  </li>
                );
              })}
              <button
                className="btn btn-warning mt-3"
                type="button"
                onClick={() => {
                  append({ size: "", stock: "" });
                }}
              >
                AGREGAR TALLA
              </button>
            </div>
          </Col>
          <Col md={4}>
            <div className="actions-new-product">
              <h4>ACCIONES</h4>
              <label htmlFor="status" className="form-label">
                Estado:
              </label>
              <select name="status" id="status" {...register("status", {})}>
                <option value="Publicado">Publicado</option>
                <option value="Borrador">Borrador</option>
              </select>
              <button
                type="submit"
                variant="success"
                className="save-product btn btn-primary mt-2"
              >
                Guardar
              </button>
            </div>
            <div className="actions-new-product">
              <label htmlFor="image" className="form-label">
                Imagen
              </label>
              <div>
                <img src={image ? image : productDetail.image} alt="img-product" />
              </div>
              <input
                disabled
                id="image"
                className="form-control"
                type="text"
                {...register("image", {})}
              />
              <input
                type="file"
                id="image"
                onChange={(e) => handleInputValue(e)}
              />
              {errors.image?.type === "required" && (
                <p className="textoError">El campo Imagen es requerido</p>
              )}
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
};
export default FormNewProduct;
