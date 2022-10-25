import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import PaypalCheckoutButton from "./PaypalCheckoutButton";
import { useSelector } from "react-redux";
import "./checkout.css";
import { useEffect, useState } from "react";

//recibe los datos de los input y verficia errores
function validateForm(dataFromInput) {
  //para verificar que solo se ingrese texto y espacios en el nombre de la receta
  //console.log("dataFromInput", dataFromInput);
  var regex = new RegExp("^[a-zA-Z ]+$");
  let errors = {};
  //validacion del nombre
  if (
    !dataFromInput.name ||
    !regex.test(dataFromInput.name) ||
    dataFromInput.name.length < 2
  ) {
    errors.name = "Ingrese un nombre válido";
  }
  //apellido
  if (
    !dataFromInput.lastname ||
    !regex.test(dataFromInput.lastname) ||
    dataFromInput.lastname.length < 2
  ) {
    errors.lastname = "Ingrese un apellido válido";
  }
  //validacion de provincia
  if (
    !dataFromInput.province ||
    !regex.test(dataFromInput.province) ||
    dataFromInput.province.length < 2
  ) {
    errors.province = "Ingrese un nombre de provincia válido";
  }
  //validacion de ciudad
  if (
    !dataFromInput.city ||
    !regex.test(dataFromInput.city) ||
    dataFromInput.city.length < 2
  ) {
    errors.city = "Ingrese un nombre de ciudad válido";
  }

  //validacion de phone
  if (dataFromInput.phone.length < 7) {
    errors.phone = "Ingrese un número de teléfono válido";
  }
  //validacion de address
  if (!dataFromInput.address || dataFromInput.address.length < 5) {
    errors.address = "Ingrese una dirección válida";
  }
  //console.log("errors", errors);
  return errors;
}

const Checkout = () => {
  const getTotal = useSelector((state) => state.cartTotal);
  const productsInTheCart = useSelector((state) => state.cartProducts);
  const currentUser = useSelector((state) => state.user);
  //aqui se guardan los errores
  const [errors, setErrors] = useState({});
  //aqui voy a guardar todos los datos del formulario
  const [input, setInput] = useState({
    name: currentUser.name ? currentUser.name : "",
    lastname: currentUser.surnames ? currentUser.surnames : "",
    email: currentUser.email ? currentUser.email : "",
    province: "",
    city: currentUser.city ? currentUser.city : "",
    postalCode: currentUser.postal_code ? currentUser.postal_code : "",
    phone: currentUser.phone ? currentUser.phone : "",
    address: currentUser.address ? currentUser.address : "",
  });
  //controlo todos los input del formulario
  const handleChange = (e) => {
    //comprobar los input que no sean checkbox
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    //console.log("input", input);
  };

  const product = {
    description: "Pedido en Qatar e-shop",
    price: getTotal,
  };

  useEffect(() => {
    setErrors(
      validateForm({
        ...input,
      })
    );
  }, []);

  return (
    <Container>
      {console.log("currentUser", currentUser)}
      <h2 className="cart-title">Finalizar compra</h2>

      <Row>
        <Col md={6}>
          <Form>
            <h4>Datos de facturación</h4>
            <Form.Group className="mb-3">
              <Form.Label>
                Nombre <span className="input-required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleChange(e)}
                value={input.name}
                name="name"
              />
              {errors.name && (
                <Alert key={"danger"} variant={"danger"}>
                  {errors.name}
                </Alert>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Apellidos <span className="input-required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleChange(e)}
                value={input.lastname}
                name="lastname"
              />
              {errors.lastname && (
                <Alert key={"danger"} variant={"danger"}>
                  {errors.lastname}
                </Alert>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Correo electrónico <span className="input-required">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => handleChange(e)}
                value={input.email}
                name="email"
                disabled
              />
              {errors.email && (
                <Alert key={"danger"} variant={"danger"}>
                  {errors.email}
                </Alert>
              )}
              <Form.Text className="text-muted">
                Nunca compartiremos su correo electrónico con nadie más.
              </Form.Text>
            </Form.Group>
            <br></br>
            <br></br>
            <h4>Datos de envío</h4>

            <Form.Group className="mb-3">
              <Form.Label>
                Ubicación <span className="input-required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleChange(e)}
                value={input.province}
                name="province"
                placeholder="Provincia"
              />
              <Form.Control
                type="text"
                onChange={(e) => handleChange(e)}
                value={input.city}
                name="city"
                placeholder="Ciudad"
              />
              {errors.city || errors.province ? (
                <Alert key={"danger"} variant={"danger"}>
                  {errors.city} <br></br>
                  {errors.province}
                </Alert>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Dirección <span className="input-required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleChange(e)}
                value={input.address}
                name="address"
              />
              {errors.address && (
                <Alert key={"danger"} variant={"danger"}>
                  {errors.address}
                </Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Teléfono <span className="input-required">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => handleChange(e)}
                value={input.phone}
                name="phone"
              />
              {errors.phone && (
                <Alert key={"danger"} variant={"danger"}>
                  {errors.phone}
                </Alert>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Código postal </Form.Label>
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
              productsInTheCart.map((element, index) => (
                <div key={index}>
                  {element.name} x
                  {element.quantity === 1
                    ? ` ${element.quantity} unidad`
                    : ` ${element.quantity} unds.`}
                </div>
              ))
            )}
            <hr></hr>
            <p className="totalsCheckout">
              <span className="totalTitle">Total: </span>
              <span>${getTotal.toLocaleString("en-US")}</span>
            </p>
          </section>
          <PaypalCheckoutButton product={product} inputErrors={errors} />
        </Col>
      </Row>
    </Container>
  );
};
export default Checkout;
