import { Col, Container, Row } from "react-bootstrap";
import AdminContent from "./AdminContent";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./admin.css";

const LayoutAdmin = () => {
  return (
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
  );
};
export default LayoutAdmin;
