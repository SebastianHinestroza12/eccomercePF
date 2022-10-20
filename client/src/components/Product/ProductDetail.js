import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./productDetail.css";
import { getProductDetail } from "../../redux/action";
import { useParams } from "react-router-dom";
import AddToCart from "./AddToCart";

const ProductDetail = () => {
  const { productId } = useParams();

  //loader hasta que se carga el detalle del producto
  const [loading, setLoading] = useState([true]);
  const [idSizeStock, setidSizeStock] = useState(0);

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  useEffect(() => {
    new Promise((resolve) => {
      resolve(dispatch(getProductDetail(productId)));
    }).then((res) => {
      setLoading(false);
    });
  }, [dispatch, productId]);

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
      {console.log("productDetail", productDetail)}
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
            <section className="sizesPicker">
              <div>
                Seleccionar talla: &nbsp;&nbsp;&nbsp;
                <select
                  className="product-size"
                  name="select"
                  onChange={(e) => {
                    setidSizeStock(e.target.value);
                  }}
                >
                  {productDetail.size_stock.map((sizeArray, index) => (
                    <option value={index}>{sizeArray.size}</option>
                  ))}
                </select>
              </div>
              <span className="stock">
                {idSizeStock >= 0
                  ? `Disponibles: ${productDetail.size_stock[idSizeStock].stock} unidades`
                  : ""}
              </span>
            </section>
            <section className="buttonsAddToCart">
              <AddToCart
                sizePicked={productDetail.size_stock[idSizeStock].size}
                stock={productDetail.size_stock[idSizeStock].stock}
              />
            </section>
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default ProductDetail;
