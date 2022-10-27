import { Container } from "react-bootstrap";
import Login from "./User/Login";
import "./redirectLogin.css";

const RedirectToLogin = () => {
  return (
    <Container className="login-page">
      <h3>Inicio de sesión</h3>
      <Login />
    </Container>
  );
};
export default RedirectToLogin;
