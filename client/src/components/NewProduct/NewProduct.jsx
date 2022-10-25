import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import "../NewProduct/newProduct.css";
import { useDispatch } from "react-redux";
import { newProductForm } from "../../redux/action";
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ddl3snuoe/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'pzsfr2g4';

let noRepeat = new Set()


function NewProduct() {
  const dispatch = useDispatch();
  const [values, setValues] = useState("");

 const [ sizeStock, setSizeStock ] = useState([{

 }])

  const [sizes, setSizes ] = useState('');


  
  // const [ formData, setFormData ] = useState({
  //   image: "",
  //     name:'',
  //     category:"",
  //     price: '',
  //     stock: '',
  //     size: '',
  //     detail: ""
  // })

  const handleInputValue = (async (e) => {
    console.log('entredd')
    const file = e.target.files[0];
    
    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset',CLOUDINARY_UPLOAD_PRESET);
  
    const res = await axios.post(CLOUDINARY_URL, formData, {
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(res.data.secure_url);
  })

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit, getValues
  } = useForm({
    defaultValues: {
      image: "https://picsum.photos/200/200",
      name:'Pelota adidas',
      category:"Balones",
      price: 99999,
      stock: "",
      size: '',
      detail: "NADA EN PARTICULAR"
    },
  });

  const [ dataForm, setDataForm ] = useState([
    {
      "name": (JSON.stringify(getValues(["name"]))),
      "price": (JSON.stringify(getValues(["price"]))),
      "detail": (JSON.stringify(getValues(["detail"]))),
      "size_stock": [
        
      ],
      "image": (JSON.stringify(getValues(["image"]))),
      "visible": true,
      "category": (JSON.stringify(getValues(["category"])))
  }
  ])
  const onSubmit = (data) => {
    console.log('DATAA', data)
    dispatch(newProductForm(data));
    reset();
  };

  const selectValidator = (value) => {
    return value !== "---";
  };

  const value = (e) => {
    setValues(e.target.value);
    noRepeat.clear()
    setSizes('')
    console.log("function", values);
 
  };

  const sizeAndStock = (e) => {
    setSizeStock({
      ...sizeStock, 
      size: e.target.previousSibling.innerHTML,
      stock: e.target.value
    })
    console.log(sizeStock)
  }

  
  const valueSize = (e) => {
    
    noRepeat.add(e.target.value);
    let result =  Array.from(noRepeat);
    setSizes(result);


    console.log("SIZE", sizes);
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
          <label htmlFor="image" class="form-label">
            Imagen
          </label>
          <input type="file" onChange={handleInputValue} id="image"
            {...register("image", {
              required: true,
            })}/>
          
          
          {/* <input
            type="text"
            class="form-control"
            id="image"
            {...register("image", {
              required: true,
            })}
          /> */}
          {errors.image?.type === "required" && (
            <p className="textoError">El campo Imagen es requerido</p>
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
        <div class="col-md-3">
          <label htmlFor="size" class="form-label">
            Tamaño
          </label>
          <select
            id="size"
            name="size"
            class="form-select"
            // aria-label="Default select example"
            {...register("size", {
              
              onChange: (e)=>valueSize(e)
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
        
        <div>
        <span>
          {
            sizes.length > 0 ? sizes.map((e , index) =><div key={index}><span>{e}</span><input placeholder="Stock" onChange={e => sizeAndStock(e)} ></input></div>)
            : null
          }
          </span>   
        </div>
      
        <div class="col-12 mt-5">
          <button type="submit" class="btn btn-danger">
            Enviar
          </button>
        </div>
        <div class="container">
        <div class="alert alert-danger alert-dismissible fade show">
              <strong>Importante!</strong> Debes llenar los campos correctamente. De lo contrario tus datos no serán convalidados
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
        </div>

      </form>

      
    </div>
  );
}

export default NewProduct;