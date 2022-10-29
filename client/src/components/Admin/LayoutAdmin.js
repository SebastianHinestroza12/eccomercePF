import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Col, Container, Row } from "react-bootstrap";
import AdminContent from "./AdminContent";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./admin.css";
// import { withAuthenticationRequired } from "@auth0/auth0-react";
// import { UilLockSlash } from "@iconscout/react-unicons";

const LayoutAdmin = () => {
  const [aprobado, setAprobado] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const hola = async () => {
      const token = await getAccessTokenSilently();
      console.log(token);
      const pedido = await axios
        .get("/user/prueba/role", {
          headers: { authorization: `Bearer ${token}` },
        })
        .catch((e) => {
          console.log(e.response);
          setAprobado(false);
        });
      console.log(pedido.data);
    };
    hola();
  }, []);

  return (
    <>

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
    
    </>
  );
};
export default LayoutAdmin;
// export default LayoutAdmin;