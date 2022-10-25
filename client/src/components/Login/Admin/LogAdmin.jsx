import React from 'react'
import Login from '../User/Login'

function LogAdmin() {
  return (
    <div className="container">

<div className="card min-vw-30 border p-3 text-center">
  <div className="card-body">
    <h5 className="card-title">Panel Admin</h5>
    <p className="card-text text-bg-danger">Espacio reservado para administradores del sitio</p>
    <h6 className="card-subtitle mb-2 text-muted">Ingresar datos</h6>
  </div>
  <Login />
</div>
    </div>
  )
}

export default LogAdmin