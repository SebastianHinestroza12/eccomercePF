import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import axios from "axios";
import "./newProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductDetail } from "../../../../redux/action";
import { newProductForm } from "../../../../redux/action";
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

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      image: "",
      name: "",
      category: "",
      price: "",
      visible: "",
      size_stock: [],
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

    if(data.size_stock.length > 0) {
    console.log("datos enviados", data);
    setImage("");
    dispatch(newProductForm(data))
    .then(dispatch(getAllProducts())
    .then(window.alert("Producto añadido correctamente")));
    reset();
    } else {
      window.alert("Por favor ingrese al menos una talla")
    }
  };

  const productDetail = useSelector((state) => state.productDetail);
  useEffect(() => {
    dispatch(getProductDetail(productId));
    //setImage(productDetail.image);
  }, [dispatch, /*setImage, productDetail.image,*/ productId]);

  function fillInputs(productDetail) {
    /*setValue("name", productDetail.name);
    setValue("price", productDetail.price);
    setValue("detail", productDetail.detail);
    setValue("image", productDetail.image);
    setValue("status", productDetail.visible ? "Publicado" : "Borrador");*/
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
              <label>Tamaño:</label>
              {fields.map((item, index) => {
                return (
                  <li className="size-stock" key={item.id}>
                    <select
                      name="select"
                      {...register(`size_stock.${index}.size`, {
                        required: true,
                      })}
                    >
                      {values === "Jersey" ? (
                        <>
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                        </>
                      ) : values === "Calzado" ? (
                        <>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </>
                      ) : (
                        <>
                          <option value="5.5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </>
                      )}
                    </select>

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
              <label htmlFor="visible" className="form-label">
                Estado:
              </label>
              <select name="visible" id="visible" {...register("visible", {})}>
                <option value="true">Publicado</option>
                <option value="false">Borrador</option>
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
              {image ? (
                <div>
                  <img src={`${image}`} alt="img-product" />
                </div>
              ) : (
                <img src="/images/thumb.png" alt="img-product" width="100%" />
              )}
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
