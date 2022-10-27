import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Redirect } from "react-router-dom";
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

  const callApi = () => {
    axios
      .get("/user/prueba")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.message));
  };
  const callProtectedApi = async () => {
    try {
        const token = await getAccessTokenSilently()
        console.log(token)
        const response = await axios.get("/user/prueba/protected",{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        
    } catch (error) {
        console.log(error.message)
    }
  };
  const callRoles = async () => {
    try {
        const token = await getAccessTokenSilently()
        const response = await axios.get("/user/prueba/role",{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        
    } catch (error) {
        console.log(error.message)
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
      <h3>User is {isAuthenticated ? "Loggued in" : "No logueado"}</h3>

      <ul>
        <li>
          <button onClick={callApi}>Call API route</button>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={callProtectedApi}>Call Protected API route</button>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={callRoles}>Call with roles</button>
        </li>
      </ul>

      {isAuthenticated && (
        <>
          <Redirect to={"/rutas"} />
          <pre style={{ textAlign: "start" }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}

export default RutasBloqueadas;
