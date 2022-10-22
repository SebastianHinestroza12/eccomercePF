import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { putUser } from '../../../redux/action';
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2';

function FormAdress() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const {
    // register,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });


  const [input, setInput] = useState({
    name: "",
    email: user.email,
    surnames: "",
    address: "",
    country: "",
    city: "",
    phone: 0,
    postal_code: 0,
    dni: 0,
  })

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    console.log(input)
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    dispatch(putUser(input))
    Swal.fire({
      title: ` Datos guardados con exitos `,
      icon: 'success',
      timer: 2000,
      confirmButtonColor: 'green',
    })
  };

  // const selectValidator = (value) => {
  //   return value !== "---";
  // };

  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Completa los campos
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="row g-1" onSubmit={e => handleSubmit(e)}>

              {/* INPUT EMAIL */}

              <div class="col-md-6">
                <label class="form-label" htmlFor="name">
                  Email
                </label>
                <input
                  class="form-control"
                  type="text"
                  value={input.email}
                  name="email"
                  disabled={true}
                />
              </div>

              {/* -------INPUT NOMBRE-------- */}
              <div class="col-md-6">
                <label class="form-label" htmlFor="name">
                  Nombre
                </label>
                <input
                  class="form-control"
                  type="text"
                  value={input.name}
                  name="name"
                  id="name"
                  required
                  onChange={e => handleChange(e)}
                // {...register(`${input.name}`, {
                //   required: true,
                //   pattern: /^[a-zA-Z\s]{0,255}$/,
                // })}
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
              <div class="col-md-6">
                <label class="form-label" htmlFor="surnames">
                  Apellido
                </label>
                <input
                  class="form-control"
                  type="text"
                  name="surnames"
                  required
                  value={input.surnames}
                  onChange={e => handleChange(e)}
                // {...register("surnames", {
                //   required: true,
                //   pattern: /^[a-zA-Z\s]{0,255}$/,
                // })}
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
              <div class="col-md-6">
                <label class="form-label" htmlFor="address">
                  Dirección
                </label>
                <input
                  class="form-control"
                  type="text"
                  name="address"
                  required
                  id="address"
                  value={input.address}
                  onChange={e => handleChange(e)}
                // {...register("address", {
                //   required: true,
                // })}
                />
                {errors.name?.type === "required" && (
                  <p className="textoError">El campo Dirección es requerido</p>
                )}
              </div>
              {/* -------INPUT CIUDAD-------- */}
              <div class="col-md-6">
                <label class="form-label" htmlFor="city">
                  Ciudad
                </label>
                <input
                  class="form-control"
                  type="text"
                  name="city"
                  required
                  id="city"
                  value={input.city}
                  onChange={e => handleChange(e)}
                // {...register("city", {
                //   required: true,
                //   pattern: /^[a-zA-Z\s]{0,255}$/,
                // })}
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
              <div class="col-md-6">
                <label htmlFor="country" class="form-label">
                  País
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  class="form-select"
                  value={input.country}
                  onChange={e => handleChange(e)}
                  aria-label="Default select example"
                // {...register("country", {
                //   validate: selectValidator,
                // })}
                >
                  <option selected>---</option>
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
              <div class="col-md-6">
                <label class="form-label" htmlFor="phone">
                  Teléfono
                </label>
                <input
                  class="form-control"
                  type="text"
                  name="phone"
                  required
                  id="phone"
                  value={input.phone}
                  onChange={e => handleChange(e)}
                // {...register("phone", {
                //   required: true,
                //   pattern:
                //     /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
                // })}
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
              <div class="col-md-3">
                <label class="form-label" htmlFor="postal_code">
                  Código Postal
                </label>
                <input
                  class="form-control"
                  type="text"
                  name="postal_code"
                  required
                  id="postal_code"
                  value={input.postal_code}
                  onChange={e => handleChange(e)}
                // {...register("postal_code", {
                //   required: true,
                //   maxLength: 4,
                //   pattern: /^-?\d*(\.\d+)?$/,
                // })}
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
              <div class="col-md-3">
                <label class="form-label" htmlFor="dni">
                  DNI
                </label>
                <input
                  class="form-control"
                  type="text"
                  name="dni"
                  required
                  id="dni"
                  value={input.dni}
                  onChange={e => handleChange(e)}
                // {...register("dni", {
                //   required: true,
                //   maxLength: 8,
                //   minLength: 8,
                //   pattern: /^-?\d*(\.\d+)?$/,
                // })}
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

              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-danger"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FormAdress;
