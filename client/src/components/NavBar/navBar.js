  import Container from "react-bootstrap/Container";
  import Nav from "react-bootstrap/Nav";
  import Navbar from "react-bootstrap/Navbar";
  import NavDropdown from "react-bootstrap/NavDropdown";
  import logo from "./logoNavbar.png";
  import * as Unicons from "@iconscout/react-unicons";
  import { Link } from "react-router-dom";
  import "./navBar.css";
  import Searchbar from "./Searchbar";
  import CartWidget from "../Cart/CartWidget";
  import Login from "../Login/User/Login.jsx";
  import { useAuth0 } from "@auth0/auth0-react";
  import Button from 'react-bootstrap/Button';
  import { listEmails } from "../../utils/EmailsValidos";

  function NavScrollExample() {
    const { user, isAuthenticated } = useAuth0();
    const name = () => {
      const emailValido = listEmails.find((e) => e === user.email);
      if (emailValido) return true
        return false;
    };

    return (
      <Navbar className="navv" variant="dark" expand="lg">
        <Container className="navbar">
          <Link to={`/`} className="navbar-brand">
            <img src={logo} alt="QATAR SHOP" className="img-fluid img-logo" />
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Searchbar />

            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <div className="divNav">
                <Link to={`/`} className="navLinks nav-link">
                  Inicio
                </Link>
                <Link to={`/store`} className="navLinks nav-link">
                  Productos
                </Link>
                <CartWidget />
                <Link to={`/`} className="navLinks nav-link w-20 loginButton">
                  <Unicons.UilUser />
                  <Login />
                </Link>
                {
                  isAuthenticated && name() ?
                    <Link to={`/panel-control`} >
                      <Button variant="outline-primary" size="lg">Panel</Button>{' '}
                    </Link> : null
                }

                {isAuthenticated && (
                  <NavDropdown
                    title="Mi cuenta"
                    id="navbarScrollingDropdown"
                    className="linkcs">

                    <NavDropdown.Item as={Link} to="/user"> Mi perfil </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/shopping"> Mis compras </NavDropdown.Item>

                  </NavDropdown>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  export default NavScrollExample;
