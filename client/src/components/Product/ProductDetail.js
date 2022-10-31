import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./productDetail.css";
import { getProductDetail } from "../../redux/action";
import { Link, useParams } from "react-router-dom";
import AddToCart from "./AddToCart";
import * as Unicons from "@iconscout/react-unicons";

const ProductDetail = () => {
  const { productId } = useParams();

  //loader hasta que se carga el detalle del producto
  const [loading, setLoading] = useState([true]);
  const [idSizeStock, setidSizeStock] = useState(0);

  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.newReviews);
  console.log("oa", reviews);

  const productDetail = useSelector((state) => state.productDetail);
  productDetail.reviews = reviews;
  console.log(productDetail);

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
  console.log("ea", productDetail);

  return (
    <Container className="product-detail">
      {console.log("productId", productDetail)}

      {loading ? (
        <img src="/images/loader-blue.gif" className="loading" alt="loader" />
      ) : (
        <Row>
          <Link to={"/store"} className="mb-5">
            <Unicons.UilArrowLeft />
            SEGUIR COMPRANDO
          </Link>
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
                    <option value={index} key={index}>
                      {sizeArray.size}
                    </option>
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
                size={productDetail.size_stock[idSizeStock].size}
                units={productDetail.size_stock[idSizeStock].stock}
              />
            </section>

            <hr></hr>
            <section>
              <h3 className="reviews-detail">Reviews</h3>
              <br></br>
              {productDetail.reviews.length ? (
                productDetail.reviews.map((e) => (
                  <>
                    <div className="testimonios-detail">
                      <div className="caja-top">
                        <div className="perfil">
                          <div className="perfil-img">
                            <img src="" alt="" />
                          </div>
                          <div className="name-user">
                            <strong>User name</strong>
                            <span>{e.name}</span>
                          </div>
                        </div>
                        <div className="reviews">
                          {e.stars === "5" ? (
                            <p className="product-stars">★★★★★</p>
                          ) : e.stars === "4" ? (
                            <p className="product-stars">★★★★</p>
                          ) : e.stars === "3" ? (
                            <p className="product-stars">★★★</p>
                          ) : e.stars === "2" ? (
                            <p className="product-stars">★★</p>
                          ) : (
                            <p className="product-stars">★</p>
                          )}
                        </div>
                      </div>
                      <div className="comentarios">
                        <p className="product-comment">"{e.comment}"</p>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <>
                  <p className="reviews">No hay reseñas de este producto</p>
                </>
              )}
            </section>
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default ProductDetail;
