import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo1 from '../Footer/logoqatartransp.png'
import carrito from './carrito.png'
import './navBar.css'
import Footer from '../Footer/footer'

function NavScrollExample() {
  return (
    <Navbar className='navv' variant='dark' expand="lg" >
      <Container fluid>
        <Navbar.Brand href="/home"><a><img src={logo1} class='img-fluid' height='120px' width='120px' /> </a></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">



          <Form className="d-flex w-50">
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-3"
              aria-label="Search"


            />
            <Button variant="outline-success">Buscar</Button>
          </Form>

          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <div class='mx-5 d-flex' >
              <Nav.Link href="/home" className='navLinks'>Inicio</Nav.Link>
              <Nav.Link href="/productos" className='navLinks'>Productos</Nav.Link>

              <NavDropdown title="Link"  id="navbarScrollingDropdown" className='linkcs'>
                <NavDropdown.Item href="#action3">Mi perfil</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Mis compras
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            <Nav.Link href="#" class='w-20' >
              <a><img class='img-fluid ml-5' height='32px' width='32px' src={carrito} /> </a>
            </Nav.Link>
            <div className='iyr'>
            <Nav.Link href="/productos" className='navLinks'>Ingresar</Nav.Link>
            <Nav.Link href="/productos" className='navLinks'>Registrarse</Nav.Link>
            </div>
          </Nav>


        </Navbar.Collapse>
      </Container>
    </Navbar>
      
  );
}

export default NavScrollExample;