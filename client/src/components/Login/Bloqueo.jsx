import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UilLockSlash } from "@iconscout/react-unicons";
import axios from "axios";

function Bloqueo() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [aprobado, setAprobado] = useState(true);
  useEffect(() => {
    const hola = async () => {
      const token = await getAccessTokenSilently();
      console.log(token);
      await axios
        .get("/user/prueba/role", {
          headers: { authorization: `Bearer ${token}` },
        })
        .catch((e) => {
          console.log(e.response);
          setAprobado(false); 
        });
    };
    hola();
  }, []);
  return (
    <>
      {aprobado === false ? (
        <div class="text-bg-danger p-5">
          <UilLockSlash />
          <span class="ms-5">
            NO TIENES LOS PERMISOS NECESARIOS PARA ACCEDER
          </span>
        </div>
      ) : ( 
        <div class="text-bg-success p-5">
          <span class="ms-5">ACCESO CORRECTO</span>
        </div>
      )}
    </>
  );
}

export default Bloqueo;
