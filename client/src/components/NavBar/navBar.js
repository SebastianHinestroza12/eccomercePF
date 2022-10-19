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
import Login from "../Login/Login";

function NavScrollExample() {
  return (
    <Navbar className="navv" variant="dark" expand="lg">
      <Container className="navbar">
        <Link to={`/home`} className="navbar-brand">
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

              <NavDropdown
                title="Mi cuenta"
                id="navbarScrollingDropdown"
                className="linkcs"
              >
                <Link to={"/user"}>
                  <NavDropdown.Item href="#action3">Mi perfil</NavDropdown.Item>
                </Link>
                <Link to="/shopping">
                  <NavDropdown.Item href="#action4">
                    Mis compras
                  </NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
