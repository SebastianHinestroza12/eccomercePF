import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { UilLockSlash } from "@iconscout/react-unicons";
import axios from "axios";

function Bloqueo() {
    const { getAccessTokenSilently} = useAuth0()
    const [aprobado, setAprobado] = useState(true);
    useEffect( () => {
        const hola = async () =>{
          const token = await getAccessTokenSilently()
          console.log(token)
          const pedido =  await axios.get("/user/prueba/role", {
              headers: { authorization: `Bearer ${token}` },
            }).catch((e)=>{
                console.log(e.response)
                setAprobado(false)
            })
            console.log(pedido.data)       
        }
        hola()
      }, []);
  return (
     <>
        {aprobado ? 
      (<div class="text-bg-success p-5">
          <br />
          <br />
          <span class="ms-5">
            logueado
          </span>
          <br />
          <br />
        </div>)
        :
        <div class="text-bg-danger p-5">
        <br />
        <br />
        <UilLockSlash />
        <span class="ms-5">
          NO TIENES LOS PERMISOS NECESARIOS PARA ACCEDER
        </span>
        <br />
        <br />
      </div>}
     </>
  )
}

export default Bloqueo