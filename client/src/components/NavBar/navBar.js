import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./logoNavbar.png";
import * as Unicons from "@iconscout/react-unicons";
import "./navBar.css";
import Searchbar from "./Searchbar";

function NavScrollExample() {
  return (
    <Navbar className="navv" variant="dark" expand="lg">
      <Container className="navbar">
        <Navbar.Brand href="/home">
          <a>
            <img src={logo} alt="QATAR SHOP" className="img-fluid img-logo" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Searchbar />

          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <div className="divNav">
              <Nav.Link href="/" className="navLinks">
                Inicio
              </Nav.Link>
              <Nav.Link href="/productos" className="navLinks">
                Productos
              </Nav.Link>

              <Nav.Link href="/carrito" className="carrito w-20">
                <a>
                  (0)
                  <Unicons.UilShoppingCartAlt />
                </a>
              </Nav.Link>

              <Nav.Link href="/carrito" className="carrito w-20">
                <a>
                  <Unicons.UilUser />
                </a>
              </Nav.Link>

              <NavDropdown
                title="Mi cuenta"
                id="navbarScrollingDropdown"
                className="linkcs"
              >
                <NavDropdown.Item href="#action3">Mi perfil</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Mis compras</NavDropdown.Item>
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
