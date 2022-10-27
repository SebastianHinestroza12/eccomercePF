import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { UilLockSlash } from '@iconscout/react-unicons'

function ComponentePrueba() {
  const [aprobado, setAprobado] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const llamada = await axios.get("/user/prueba/role", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(llamada.data);
      setAprobado(true);
    } catch (error) {
      console.log(error.message);
      setAprobado(false);
    }
  }, []);

  return (
    <>
      {aprobado === true ?  (
        <div>
          <br />
          <br />
          <br />
          <h1>PROBANDO BLOQUEO</h1>
          <br />
          <br />
          <br />
        </div>
      ) : <div class="text-bg-danger p-5">
        <br />
        <br />
        <UilLockSlash />
        <span class="ml-5">NO TIENES LOS PERMISOS NECESARIOS PARA ACCEDER</span>
        <br />
        <br />
      </div>
    }
    </>
  );
}

export default ComponentePrueba;
