import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import "./productDetail.css";
import { getProductDetail } from "../../redux/action";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();

  //loader hasta que se carga el detalle del producto
  const [loading, setLoading] = useState([true]);

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);

  useEffect(() => {
    new Promise((resolve) => {
      resolve(dispatch(getProductDetail(productId)));
    }).then((res) => {
      setLoading(false);
    });
  }, [dispatch, productId]);

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

  function writeRatingStars(rating) {
    let ratingStars = [];
    for (let i = 1; i <= rating; i++) {
      ratingStars.push("★");
    }
    for (let i = 1; i <= 5 - rating; i++) {
      ratingStars.push("☆");
    }
    return ratingStars.join("");
  }

  return (
    <Container className="product-detail">
      {loading ? (
        <img src="/images/loader-blue.gif" className="loading" alt="loader" />
      ) : (
        <Row>
          <Col md={5} className="sidebar">
            <img src={productDetail.image} alt="product-name" />
          </Col>
          <Col md={7}>
            <section id="detail">
              <h3>{productDetail.name}</h3>
              <div className="rating">
                {writeRatingStars(productDetail.stars)}
              </div>
              <hr></hr>
              <h4>$ {productDetail.price}</h4>
              <p className="detail-text">{productDetail.detail}</p>
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

              <Button className="buy">COMPRAR</Button>
            </section>
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default ProductDetail;
