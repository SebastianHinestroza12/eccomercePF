import React, { Component } from 'react';
import axios from "axios";
import { UilLockSlash } from "@iconscout/react-unicons";
import { withAuth0 } from "@auth0/auth0-react";
import { Col, Container, Row } from "react-bootstrap";
import AdminContent from "./AdminContent";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./admin.css";

class LayoutAdminClassComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { usuarioVerificado: false };
    }
    async componentDidMount() {
        try {
          const { getAccessTokenSilently } = this.props.auth0;
          const token = await getAccessTokenSilently();
          const pedido = await axios.get("/user/prueba/role", {
            headers: { authorization: `Bearer ${token}` },
          });
          //console.log("llamado a api -->", pedido.data);
          //console.log("estado", this.state.usuarioVerificado);
        } catch (error) {
          this.setState({ usuarioVerificado: false });
          //console.log("estado", this.state.usuarioVerificado);
          //console.log("ERROR", error.response);
        }
      }    
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        //console.log("usuario", user);
        // console.log(user.email); --> NO FUNCA
        //console.log("isAuthenticated", isAuthenticated);
        // `this.props.auth0` has all the same properties as the `useAuth0` hook
        return (
            <div>
            {this.state.usuarioVerificado === true ? (
              <div class="text-bg-danger p-5">
                <h1>PRUEBA CON CLASES</h1>
                <UilLockSlash />
                <span class="ms-5">
                  NO TIENES LOS PERMISOS NECESARIOS PARA ACCEDER
                </span>
              </div>
            ) 
            : (
                <Container fluid className="admin">
                <Row>
                  <Col md={2} className="sidebar">
                    <AdminSidebar />
                  </Col>
                  <Col>
                    <AdminHeader />
                    <div className="body flex-grow-1 px-3">
                      <AdminContent />
                    </div>
                  </Col>
                </Row>
              </Container>
            )}
          </div>
        );
    }
}

export default withAuth0(LayoutAdminClassComponent);