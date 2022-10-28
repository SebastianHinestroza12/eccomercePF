import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Col, Container, Row } from "react-bootstrap";
import AdminContent from "./AdminContent";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./admin.css";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { UilLockSlash } from '@iconscout/react-unicons'


const LayoutAdmin = () => {
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
      {aprobado === true ? (
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
      ) : (
        <div class="text-bg-danger p-5">
          <br />
          <br />
          <UilLockSlash />
          <span class="ms-5">
            NO TIENES LOS PERMISOS NECESARIOS PARA ACCEDER
          </span>
          <br />
          <br />
        </div>
      )}
    </>
  );
};
export default withAuthenticationRequired(LayoutAdmin);
// export default LayoutAdmin;
