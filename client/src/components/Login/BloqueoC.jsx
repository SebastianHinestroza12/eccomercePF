import axios from "axios";
import { UilLockSlash } from "@iconscout/react-unicons";
import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";

class BloqueoC extends Component {
  constructor(props) {
    super(props);
    this.state = { usuarioVerificado: true };
  }

  async componentDidMount() {
    try {
      const { getAccessTokenSilently } = this.props.auth0;
      const token = await getAccessTokenSilently();
      const pedido = await axios.get("/user/prueba/role", {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log("llamado a api -->", pedido.data);
      console.log("estado", this.state.usuarioVerificado);
    } catch (error) {
      this.setState({ usuarioVerificado: false });
      console.log("estado", this.state.usuarioVerificado);
      console.log("ERROR", error.response);
    }
  }

  render() {
    const { user, isAuthenticated } = this.props.auth0;
    console.log("usuario", user);
    // console.log(user.email); --> NO FUNCA
    console.log("isAuthenticated", isAuthenticated);
    // `this.props.auth0` has all the same properties as the `useAuth0` hook
    return (
      <div>
        {this.state.usuarioVerificado === false ? (
          <div class="text-bg-danger p-5">
            <h1>PRUEBA CON CLASES</h1>
            <UilLockSlash />
            <span class="ms-5">
              NO TIENES LOS PERMISOS NECESARIOS PARA ACCEDER
            </span>
          </div>
        ) : (
          <div class="text-bg-success p-5">
            <h1>PRUEBA CON CLASES</h1>
            <span class="ms-5">ACCESO CORRECTO</span>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth0(BloqueoC);
