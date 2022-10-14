import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './logoNavbar.png'
import * as Unicons from '@iconscout/react-unicons'
import './navBar.css'


function NavScrollExample() {
  return (
    <Navbar className='navv' variant='dark' expand="lg" >
      <Container fluid>
        <Navbar.Brand href="/home"><a><img src={logo} alt='QATAR SHOP' class='img-fluid' className='img-logo'  /> </a></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">



          <Form className="d-flex w-50">
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-3"
              aria-label="Search"


            />
            <Button variant="outline-success" className='but'>Buscar</Button>
          </Form>

          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
            <div class='divNav' >
              <Nav.Link href="/home" className='navLinks'>Inicio</Nav.Link>
              <Nav.Link href="/productos" className='navLinks'>Productos</Nav.Link>

              <NavDropdown title="Link"  id="navbarScrollingDropdown" className='linkcs'>
                <NavDropdown.Item href="#action3">Mi perfil</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Mis compras
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else 
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            <Nav.Link href="/carrito" class='w-20' >
              <a><Unicons.UilShoppingCartAlt /> </a>
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