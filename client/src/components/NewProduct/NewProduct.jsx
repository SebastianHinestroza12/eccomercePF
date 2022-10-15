import React from "react";
import { useForm } from "react-hook-form";
import '../NewProduct/newProduct.css'

function NewProduct() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      name: "Balon Adidas",
      category: "Balones",
      price: 100,
      stock: 4,
      image: "https://dwefffewfweqf.com",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const selectValidator = (value) => {
    return value !== "---";
  };

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
            <p>El campo nombre es requerido</p>
          )}
          {errors.name?.type === "maxLength" && (
            <p>Máximo de carácteres permitidos</p>
          )}
          {errors.name?.type === "pattern" && (
            <p>No se permiten números o símbolos</p>
          )}
        </div>
        <div class="col-md-3">
          <label htmlFor="category" class="form-label">
            Categoría
          </label>
          <input
            class="form-control"
            type="text"
            id="category"
            {...register("category", {
              required: true,
              pattern: /^[a-zA-Z\s]{0,255}$/,
            })}
          />
          {errors.category?.type === "required" && (
            <p>El campo nombre es requerido</p>
          )}
          {errors.category?.type === "pattern" && (
            <p>No se permiten números o símbolos</p>
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
          {errors.price?.type === "pattern" && <p>Sólo números permitidos</p>}
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
          {errors.stock?.type === "pattern" && <p>Sólo números permitidos</p>}
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
          {errors.image?.type === "pattern" && (
            <p>El formato debe ser tipo EMAIL</p>
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
          {errors.stars && <p>Debes seleccionar una opción</p>}
        </div>
        <div class="col-md-3">
          <label htmlFor="size" class="form-label">
            Tamaño
          </label>
          <select
            id="size"
            name="size"
            class="form-select"
            aria-label="Default select example"
            {...register("size", {
              validate: selectValidator,
            })}
          >
            <option selected>---</option>
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
          </select>
          {errors.size && <p>Debes seleccionar una opción</p>}
        </div>
        <div class="col-md-6">
          <div class="form-floating">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              {...register("detail", {
                required: true
              })}
            ></textarea>
            <label for="floatingTextarea">Detalles</label>
            {errors.detail?.type === "required" && (
            <p>El campo detalles es requerido</p>
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
