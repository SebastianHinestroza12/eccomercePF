import React from "react";
import { useForm } from "react-hook-form";
import { putUser } from "../../../redux/action";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

function FormAdress() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      surnames: "",
      address: "",
      city: "",
      country: "",
      phone: 9543757605859,
      postal_code: 5000,
      dni: 31256762,
    },
  });

  const onSubmit = (data) => {
    console.log("enviando formulario", data.email);
    dispatch(putUser(data));
    Swal.fire({
      title: ` Datos guardados con exitos `,
      icon: "success",
      timer: 2000,
      confirmButtonColor: "green",
    });
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
              {/* -------INPUT EMAIL-------- */}
              <div className="col-md-6">
                <label className="form-label" htmlFor="name">
                  Email
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={user.email}
                  name="email"
                  id="email"
                  // disabled={true}
                  {...register("email", {})}
                />
              </div>

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
                  // value={input.name}
                  // onChange={e => handleChange(e)}
                  {...register("name", {
                    required: true,
                    pattern: /^[a-zA-Z\s]{0,255}$/,
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
              {/* -------INPUT APELLIDO-------- */}
              <div className="col-md-6">
                <label className="form-label" htmlFor="surnames">
                  Apellido
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="surnames"
                  id="surnames"
                  // onChange={e => handleChange(e)}
                  {...register("surnames", {
                    required: true,
                    pattern: /^[a-zA-Z\s]{0,255}$/,
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
              {/* -------INPUT DIRECCION-------- */}
              <div className="col-md-6">
                <label className="form-label" htmlFor="address">
                  Dirección
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  id="address"
                  {...register("address", {
                    required: true,
                  })}
                />
                {errors.address?.type === "required" && (
                  <p className="textoError">El campo Dirección es requerido</p>
                )}
              </div>
              {/* -------INPUT CIUDAD-------- */}
              <div className="col-md-6">
                <label className="form-label" htmlFor="city">
                  Ciudad
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="city"
                  id="city"
                  {...register("city", {
                    required: true,
                    pattern: /^[a-zA-Z\s]{0,255}$/,
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
              {/* -------INPUT PAIS-------- */}
              <div className="col-md-6">
                <label htmlFor="country" className="form-label">
                  País
                </label>
                <select
                  id="country"
                  name="country"
                  className="form-select"
                  aria-label="Default select example"
                  {...register("country", {
                    validate: selectValidator,
                  })}
                >
                  <option>---</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Chile">Chile</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Perú">Perú</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Venezuela">Venezuela</option>
                </select>
                {errors.country && (
                  <p className="textoError">Debes seleccionar una opción</p>
                )}
              </div>
              {/* -------INPUT TELEFONO-------- */}
              <div className="col-md-6">
                <label className="form-label" htmlFor="phone">
                  Teléfono
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="phone"
                  id="phone"
                  {...register("phone", {
                    required: true,
                    pattern:
                      /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
                  })}
                />
                <small>Format: 1234-56-7890</small>
                {errors.phone?.type === "required" && (
                  <p className="textoError">El campo Teléfono es requerido</p>
                )}
                {errors.phone?.type === "pattern" && (
                  <p className="textoError">
                    No corresponde a un número válido
                  </p>
                )}
              </div>
              {/* -------INPUT CP-------- */}
              <div className="col-md-3">
                <label className="form-label" htmlFor="postal_code">
                  Código Postal
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="postal_code"
                  id="postal_code"
                  {...register("postal_code", {
                    required: true,
                    maxLength: 4,
                    pattern: /^-?\d*(\.\d+)?$/,
                  })}
                />
                {errors.postal_code?.type === "required" && (
                  <p className="textoError">El campo CP es requerido</p>
                )}
                {errors.postal_code?.type === "pattern" && (
                  <p className="textoError">Sólo números permitidos</p>
                )}
                {errors.postal_code?.type === "maxLength" && (
                  <p className="textoError">Máximo de carácteres permitidos</p>
                )}
              </div>
              {/* -------DNI-------- */}
              <div className="col-md-3">
                <label className="form-label" htmlFor="dni">
                  DNI
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="dni"
                  id="dni"
                  {...register("dni", {
                    required: true,
                    maxLength: 8,
                    minLength: 8,
                    pattern: /^-?\d*(\.\d+)?$/,
                  })}
                />
                {errors.dni?.type === "required" && (
                  <p className="textoError">El campo DNI es requerido</p>
                )}
                {errors.dni?.type === "pattern" && (
                  <p className="textoError">Sólo números permitidos</p>
                )}
                {errors.dni?.type === "maxLength" && (
                  <p className="textoError">Máximo de carácteres permitidos</p>
                )}
                {errors.dni?.type === "minLength" && (
                  <p className="textoError">Mínimo de carácteres permitidos</p>
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
  );
}

export default FormAdress;
