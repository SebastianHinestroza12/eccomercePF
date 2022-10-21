import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../NewProduct/newProduct.css";
import { useDispatch } from "react-redux";
import { envioForm } from "../../redux/action";

function NewProduct() {
  const dispatch = useDispatch();
  const [values, setValues] = useState("");

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      image: "https://picsum.photos/200/200",
    },
  });

  const onSubmit = (data) => {
    alert("Se enviaron los datos correctamente");
    dispatch(envioForm(data));
    reset();
  };

  const selectValidator = (value) => {
    return value !== "---";
  };

  const value = (e) => {
    setValues(e.target.value);
    console.log("function", values);
  };
  console.log("nop", values);
  return (
    <div class="container">
      <h1
        style={{
          fontFamily: "Verdana",
          backgroundColor: "#bed6ed",
          padding: "8px",
          color: "#292828",
        }}
      >
        Nuevo Producto
      </h1>
      <hr />
      <form class="row g-3 mt-3" onSubmit={handleSubmit(onSubmit)}>
        <div class="col-md-3">
          <label htmlFor="name" class="form-label">
            Nombre
          </label>
          <input
            id="name"
            class="form-control"
            type="text"
            {...register("name", {
              required: true,
              pattern: /^[a-zA-Z\s]{0,255}$/,
              maxLength: 20,
            })}
          />
          {errors.name?.type === "required" && (
            <p className="textoError">El campo Nombre es requerido</p>
          )}
          {errors.name?.type === "maxLength" && (
            <p className="textoError">Máximo de carácteres permitidos</p>
          )}
          {errors.name?.type === "pattern" && (
            <p className="textoError">No se permiten números o símbolos</p>
          )}
        </div>
        <div class="col-md-3">
          <label htmlFor="category" class="form-label">
            Categoría
          </label>
          <select
            onClick={value}
            class="form-control"
            name="category"
            id="category"
            aria-label="Default select example"
            {...register("category", {
              validate: selectValidator,
            })}
          >
            <option selected>---</option>
            <option value="Camisetas">Camisetas</option>
            <option value="Botines">Botines</option>
            <option value="Balones">Balones</option>
          </select>
          {errors.category && (
            <p className="textoError">Debes seleccionar una opción</p>
          )}
        </div>
        <div class="col-md-3">
          <label htmlFor="price" class="form-label">
            Precio
          </label>
          <input
            class="form-control"
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
        <div class="col-md-3">
          <label htmlFor="stock" class="form-label">
            Stock
          </label>
          <input
            class="form-control"
            type="text"
            id="stock"
            {...register("stock", {
              required: true,
              pattern: /^-?\d*(\.\d+)?$/,
            })}
          />
          {errors.stock?.type === "required" && (
            <p className="textoError">El campo Stock es requerido</p>
          )}
          {errors.stock?.type === "pattern" && (
            <p className="textoError">Sólo números permitidos</p>
          )}
        </div>
        <div class="col-md-3">
          <label htmlFor="image" class="form-label">
            Imagen
          </label>
          <input
            class="form-control"
            type="text"
            id="image"
            {...register("image", {
              required: true,
            })}
          />
          {errors.image?.type === "required" && (
            <p className="textoError">El campo Imagen es requerido</p>
          )}
        </div>
        <div class="col-md-3">
          <label htmlFor="stars" class="form-label">
            Puntuación
          </label>
          <select
            id="stars"
            name="stars"
            class="form-select"
            aria-label="Default select example"
            {...register("stars", {
              validate: selectValidator,
            })}
          >
            <option selected>---</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors.stars && (
            <p className="textoError">Debes seleccionar una opción</p>
          )}
        </div>
        <div class="col-md-3">
          <label htmlFor="size" class="form-label">
            Tamaño
          </label>
          <select
            onChange={value}
            id="size"
            name="size"
            class="form-select"
            aria-label="Default select example"
            {...register("size", {
              validate: selectValidator,
            })}
          >
            {values === "Camisetas" ? (
              <>
                <option selected>---</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </>
            ) : values === "Botines" ? (
              <>
                <option selected>---</option>
                <option value="1">1</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </>
            ) : (
              <>
                <option selected>---</option>
                <option value="5.5">5.5</option>
                <option value="6.5">6.5</option>
                <option value="7">7</option>
              </>
            )}
          </select>
          {errors.size && (
            <p className="textoError">Debes seleccionar una opción</p>
          )}
        </div>
        <div class="col-md-6">
          <div class="form-floating">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              {...register("detail", {
                required: true,
              })}
            ></textarea>
            <label for="floatingTextarea">Detalles</label>
            {errors.detail?.type === "required" && (
              <p className="textoError">El campo Detalles es requerido</p>
            )}
          </div>
        </div>
        <div class="col-12 mt-5">
          <button type="submit" class="btn btn-danger">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewProduct;
