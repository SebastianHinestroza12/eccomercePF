import React from 'react'
import Login from '../User/Login'

function LogAdmin() {
  return (
    <div className="container">

<div class="card min-vw-30 border p-3 text-center">
  <div class="card-body">
    <h5 class="card-title">Panel Admin</h5>
    <p class="card-text text-bg-danger">Espacio reservado para administradores del sitio</p>
    <h6 class="card-subtitle mb-2 text-muted">Ingresar datos</h6>
  </div>
  <Login />
</div>
    </div>
  )
}

export default LogAdmin