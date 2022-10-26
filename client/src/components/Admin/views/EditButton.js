import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector} from "react-redux";
import { getProductDetail, putProduct2 } from "../../../redux/action";

function EditButton({idProduct}) {
    const dispatch = useDispatch();
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            
        },
    });
    const productDetail = useSelector((state) => state.productDetail);

    useEffect(()=> {
        dispatch(getProductDetail(idProduct))
        console.log(productDetail)
    }, [dispatch])
    
    const onSubmit = (data) => {
        console.log("enviando formulario", data);
        dispatch(putProduct2(data));
        reset();
    };
    
    const selectValidator = (value) => {
        return value !== "---";
    };
    
    
    
    return (
        
        <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Completa los campos
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form className="row g-1">
                            {/* -------INPUT NOMBRE-------- */}
                            <div className="col-md-6">


                                <label className="form-label" htmlFor="name">
                                    Nombre
                                </label>

                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    id="name"
                                    // disabled={true}
                                    {...register("name", {})}
                                />
                            </div>

                            {/* -------INPUT PRECIO-------- */}
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="price">
                                    Precio
                                </label>


                                <input
                                    className="form-control"
                                    type="text"
                                    name="price"
                                    id="price"
                                    // value={input.name}
                                    // onChange={e => handleChange(e)}
                                    {...register("price", {
                                        required: true,

                                    })}
                                />
                                {errors.name?.type === "required" && (
                                    <p className="textoError">El campo Nombre es requerido</p>
                                )}
                                {errors.name?.type === "pattern" && (
                                    <p className="textoError">
                                        No se permiten números o símbolos
                                    </p>
                                )}
                            </div>
                            {/* -------INPUT STRELLAS-------- */}
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="stars">
                                    Stars
                                </label>


                                <input
                                    className="form-control"
                                    type="text"
                                    name="stars"
                                    id="stars"
                                    // value={input.name}
                                    // onChange={e => handleChange(e)}
                                    {...register("stars", {
                                        required: true,

                                    })}
                                />
                                {errors.name?.type === "required" && (
                                    <p className="textoError">El campo Nombre es requerido</p>
                                )}
                                {errors.name?.type === "pattern" && (
                                    <p className="textoError">
                                        No se permiten números o símbolos
                                    </p>
                                )}
                            </div>


                            {/* -------INPUT DETALLE-------- */}
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="detail">
                                    Detalle
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="detail"
                                    id="detail"
                                    // onChange={e => handleChange(e)}
                                    {...register("detail", {
                                        required: true,
                                    })}
                                />
                                {errors.surnames?.type === "required" && (
                                    <p className="textoError">El campo Apellido es requerido</p>
                                )}
                                {errors.surnames?.type === "pattern" && (
                                    <p className="textoError">
                                        No se permiten números o símbolos
                                    </p>
                                )}
                            </div>
                            {/* -------INPUT TAMAÑO/STOCK-------- */}
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="size-stock">
                                    TAMAÑO/STOCK
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="size-stock"
                                    id="size-stock"
                                    {...register("size-stock", {
                                      
                                    })}
                                />
                                {errors.address?.type === "required" && (
                                    <p className="textoError">El campo Dirección es requerido</p>
                                )}
                            </div>
                            {/* -------INPUT IMAGEN-------- */}
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="image">
                                    Imagen
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="image"
                                    id="image"
                                    {...register("image", {
                                        required: true,

                                    })}
                                />
                                {errors.city?.type === "required" && (
                                    <p className="textoError">El campo Ciudad es requerido</p>
                                )}
                                {errors.city?.type === "pattern" && (
                                    <p className="textoError">
                                        No se permiten números o símbolos
                                    </p>
                                )}
                            </div>
                            {/* -------INPUT VISIBLE-------- */}
                            <div className="col-md-6">
                                <label htmlFor="visible" className="form-label">
                                    Visible
                                </label>
                                <select
                                    id="visible"
                                    name="visible"
                                    className="form-select"
                                    aria-label="Default select example"
                                    {...register("visible", {
                                        validate: selectValidator,
                                    })}
                                >
                                    <option>---</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>

                                </select>
                                {errors.country && (
                                    <p className="textoError">Debes seleccionar una opción</p>
                                )}
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="submit"
                            className="btn btn-danger"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Guardar cambios
                        </button>

                        <div className="alert alert-warning alert-dismissible fade show">
                            <strong>Importante!</strong> Debes llenar los campos correctamente
                            para que tus datos sean convalidados
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                            ></button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditButton