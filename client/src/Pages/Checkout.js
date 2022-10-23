import { Col, Container, Form, Row } from "react-bootstrap";
import PaypalCheckoutButton from "./PaypalCheckoutButton";
import { useSelector } from "react-redux";
import "./checkout.css";

const Checkout = () => {
  const getTotal = useSelector((state) => state.cartTotal);
  const productsInTheCart = useSelector((state) => state.cartProducts);

  const product = {
    description: "Pedido en Qatar e-shop",
    price: getTotal,
  };
  return (
    <Container>
      {console.log("total en checkout", getTotal)}
      <h2 className="cart-title">Finalizar compra</h2>

      <Row>
        <Col md={6}>
          <Form>
            <h4>Datos de facturación</h4>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <br></br>
            <br></br>
            <h4>Datos de envío</h4>

            <Form.Group className="mb-3">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                placeholder="Provincia"
                className="col-md-6"
              />
              <Form.Control
                className="col-md-6"
                type="text"
                placeholder="Ciudad"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Código postal</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Form>
        </Col>
        <Col md={6}>
          <section className="totals checkout">
            <h4>Productos en el carrito</h4>
            {productsInTheCart.length === 0 ? (
              <div>Aún no hay productos en el carrito</div>
            ) : (
              productsInTheCart.map((element) => (
                <div>
                  {element.name} x
                  {element.quantity === 1
                    ? ` ${element.quantity} unidad`
                    : ` ${element.quantity} unds.`}
                </div>
              ))
            )}
            <hr></hr>
            <p className="totalsCheckout">
              <span className="totalTitle">Total: </span>$
              {getTotal.toLocaleString("en-US")}
            </p>
          </section>
          <PaypalCheckoutButton product={product} />
        </Col>
      </Row>
    </Container>
  );
};
export default Checkout;
