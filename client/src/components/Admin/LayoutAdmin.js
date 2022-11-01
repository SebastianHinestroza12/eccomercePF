import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Col, Container, Row } from "react-bootstrap";
import AdminContent from "./AdminContent";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { getOrder } from '../../redux/action';
import { useDispatch } from "react-redux";
import "./admin.css";


const LayoutAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder())
  }, [dispatch])

  const { user, isAuthenticated } = useAuth0();
  const name = () => {
    if (user.email === "qatareshop08@gmail.com") return true
    else return false
  }
  return (
    <div>
      {
        isAuthenticated && name() ?
          (
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
          ) : <div>No tenes permiso para ingresar</div>
      }
    </div>
  );
};
export default LayoutAdmin;
// export default La/* Exportando el componente. */