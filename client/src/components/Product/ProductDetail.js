import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useState } from "react";

import * as Unicons from "@iconscout/react-unicons";

import "./productDetail.css";

const ProductDetail = () => {
  /**ESTADOS PARA CONTROLAR EL AGREGAR O ELIMINAR CANTIDAD DEL PRODUCTO AL CARRITO */
  const [quantity, setQuantity] = useState(0);

  function addQuantityToCart(actionButton) {
    if (quantity === 0 && actionButton === "minus") {
      console.log("no puedo restar mas");
    } else if (actionButton === "minus") {
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  }

  return (
    <Container>
      <Row>
        <Col md={5} className="sidebar">
          <img
            src="https://demo2.drfuri.com/martfury12/wp-content/uploads/sites/53/2017/09/1a.jpg"
            alt="product-name"
          />
        </Col>
        <Col md={7}>
          <section id="detail">
            <h3>Herschel Leather Duffle Bag In Brown Color</h3>
            ★★★★
            <hr></hr>
            <h4>$125.30</h4>
            <p>
              Unrestrained and portable active stereo speaker Free from the
              confines of wires and chords 20 hours of portable capabilities
              Double-ended Coil Cord with 3.5mm Stereo Plugs Included 3/4″ Dome
              Tweeters: 2X and 4″ Woofer: 1X
            </p>
          </section>
          <section className="buttonsAddToCart">
            <div>
              Cantidad
              <div className="qty-box">
                <span
                  className="cartButtons decrease"
                  onClick={() => addQuantityToCart("minus")}
                >
                  <Unicons.UilMinus />
                </span>
                <input
                  type="number"
                  id="quantity_6347dd6ab108a"
                  className="input-text qty text"
                  step="1"
                  min="1"
                  max=""
                  name="quantity"
                  value={quantity}
                  title="Qty"
                  size="4"
                  placeholder=""
                  inputMode="numeric"
                  readOnly={true}
                />
                <span
                  className="cartButtons increase"
                  onClick={() => addQuantityToCart("plus")}
                >
                  <Unicons.UilPlus />
                </span>
              </div>
            </div>

            <Button>COMPRAR</Button>
          </section>
        </Col>
      </Row>
    </Container>
  );
};
export default ProductDetail;
