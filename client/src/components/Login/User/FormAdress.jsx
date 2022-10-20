import React from "react";

function FormAdress() {
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
            <form class="row g-1">
            <div class="col-md-6">
              <label class="form-label" htmlFor="direccion">Dirección</label>
              <input class="form-control" type="text" name="direccion" id="direccion" />
            </div>
            <div class="col-md-6">
              <label class="form-label" htmlFor="ciudad">Ciudad</label>
              <input class="form-control" type="text" name="ciudad" id="ciudad" />
            </div>
            <div class="col-md-3">
              <label class="form-label" htmlFor="CP">CP</label>
              <input class="form-control" type="text" name="CP" id="CP" />
            </div>
            <div class="col-md-3">
              <label class="form-label" htmlFor="telefono">Teléfono</label>
              <input class="form-control" type="text" name="telefono" id="telefono" />
            </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormAdress;
