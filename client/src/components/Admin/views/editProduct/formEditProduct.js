import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, editProductForm, cleanProductDetail } from "../../../../redux/action";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import * as Unicons from "@iconscout/react-unicons";
import "./editProduct.css";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/ddl3snuoe/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "pzsfr2g4";

let noRepeat = new Set();

const FormNewProduct = ({ productId, productDetail2 }) => {

  const [values, setValues] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);

  const handleInputValue = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await axios.post(CLOUDINARY_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setImage(res.data.secure_url);
    setValue("image", res.data.secure_url);
  };

  const { register, reset, formState: { errors }, handleSubmit, control, setValue } = useForm ({ 
    defaultValues: { id: productId, name: "", detail: "", price: "", visible: "", image: "",
        category: "",
        size_stock: []
      },
    });
    
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'size_stock',
  });
  
  useEffect(() => {
    productDetail.size_stock ? console.log("nada") : dispatch(getProductDetail(productId));
    setValue('size_stock', productDetail.size_stock);
    setValue("visible", productDetail.visible ? "true" : "false");
    setValue("category", productDetail.categories ? productDetail.categories[0].name : false);

  }, [dispatch, productDetail.size_stock ? false : productDetail.size_stock, productId, setValue]);

  const value = (e) => {
    setValues(e.target.value);
    noRepeat.clear();
  };

  const onSubmit = (data) => {
    dispatch(editProductForm(data)).then(() => window.location.reload(false));
  };

  function fillInputs(productDetail) {
    setValue("name", productDetail.name);
    setValue("price", productDetail.price);
    setValue("detail", productDetail.detail);
    setValue("image", productDetail.image);
  }
    console.log(productDetail);
  return (
    <>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        {[productDetail].length > 0 && fillInputs(productDetail)}
        <Row className="new-product">
          <Col md={8}>
            <div>
              <label> Nombre </label>
              <input id="name" className="form-control" type="text" { ...register("name") } />
            </div>
            <div>
              <label> Precio </label>
              <input className="form-control" type="text" id="price" { ...register("price") } />
            </div>
              <div>
                <label> Detalles </label>
                  <textarea rows={10} className="form-control" placeholder="" id="floatingTextarea" {...register("detail") }/>
              </div>
            <div>
              <label> Categoría </label>
              <select onClick={value} name="category" id="category" aria-label="Default select example" { ...register("category") }>

                <option value="Jersey">Jersey</option>
                <option value="Balon">Balon</option>
                <option value="Calzado">Calzado</option>
                <option value="Short">Short</option>

              </select>
            </div>

            <div>
              <label>Talla y stock:</label>
              {fields.map((field, index) => (

                  <li className="size-stock" key={ field.id }>
                    <input className="form-control" {...register(`size_stock.${index}.size`, { required: true })} />
                    <input className="form-control" {...register(`size_stock.${index}.stock`, { required: true })} />

                    <button type="button" className="remove-item btn btn-danger" onClick={() => remove(index)}>
                      <Unicons.UilTrash />
                    </button>

                  </li>
                )
              )}
              <button className="btn btn-warning mt-3" type="button" onClick={() => { append({ size: "", stock: "" }) }}> AGREGAR TALLA </button>
            </div>
            
          </Col>
          <Col md={4}>
            <div className="actions-new-product">
              <h4>ACCIONES</h4>
              <label> Estado: </label>
              <select onClick={value} name="visible" id="visible" aria-label="Default select example" { ...register("visible") }>

                <option value="true">Publicado</option>
                <option value="false">Borrador</option>

              </select>
              <button type="submit" variant="success" className="save-product btn btn-primary mt-2"> Guardar </button>
            </div>
            <div className="actions-new-product">
              <label> Imagen </label>
              <div>
                <img src={image ? image : productDetail.image} alt="img-product" />
              </div>
              <input disabled id="image" className="form-control" type="text" { ...register("image") } />
              <input type="file" id="image" onChange={ (e) => handleInputValue(e) } />
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
};
export default FormNewProduct;
