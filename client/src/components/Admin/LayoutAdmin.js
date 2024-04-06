import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Col, Container, Row } from "react-bootstrap";
import AdminContent from "./AdminContent";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { getOrder } from "../../redux/action";
import { useDispatch } from "react-redux";
import "./admin.css";
import { listEmails } from "../../utils/EmailsValidos";
import { UilLockSlash } from "@iconscout/react-unicons";


const LayoutAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const { user, isAuthenticated } = useAuth0();

  const name = () => {
    const emailValido = listEmails.find((e) => e === user.email);
    console.log(emailValido)
    if (emailValido) {
      console.log("Email correcto, puede acceder");
      return true;
    } else {
      console.log("Email incorrecto, no puede acceder");
      return false;
    }
  };
  return (
    <div>
      {isAuthenticated && name() ? (
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
        <UilLockSlash />
        <span class="ms-5">
          NO TIENES LOS PERMISOS NECESARIOS PARA ACCEDER
        </span>
      </div>
      )}
    </div>
  );
};
export default LayoutAdmin;
// export default La/* Exportando el componente. */