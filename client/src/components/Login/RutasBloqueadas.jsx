import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import axios from "axios";

function RutasBloqueadas() {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const accederPublica = () => {
    axios
      .get("/user/prueba")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.message));
  };
  const accederProtegida = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const response = await axios.get("/user/prueba/protected", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const accederRoles = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("/user/prueba/role", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data); //Respuesta de la ruta del Back
    } catch (error) {
      console.log(error.message);
    }    
  };


  return (

    <div>
      <h1>Auth0 Authentication</h1>
      <ul>
        <li>
          <button onClick={loginWithPopup}>Login with popup</button>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={loginWithRedirect}>Login with redirect</button>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
      <br />
      <br />
      <h3 class="text-bg-danger">El usuario esta: {isAuthenticated ? "LOGUEADO" : "NO LOGUEADO"}</h3>
      <br />
      <br />
      <ul>
        <li>
          <button onClick={accederPublica}>RUTA PUBLICA</button>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={accederProtegida}>RUTA PROTEGIDA</button>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={accederRoles}>RUTA CON ROLES</button>
        </li>
      </ul>

      {isAuthenticated && (
        <>
          <pre style={{ textAlign: "start" }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </>
      )}
    </div>

  );
}

export default RutasBloqueadas;
