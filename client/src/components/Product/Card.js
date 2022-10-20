import Card from "react-bootstrap/Card";
<<<<<<< HEAD
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import {addProductToCart} from "../../redux/action"
=======

>>>>>>> 4b48d3a183be1a3575cb30be1f5cc9568107be3f
import "./card.css";
//UNIcons library
import * as Unicons from "@iconscout/react-unicons";
import { addProductToCart } from "../../redux/action";
=======
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../redux/action";
import "./card.css";
//UNIcons library
import * as Unicons from "@iconscout/react-unicons";
import { Toast } from "react-bootstrap";
import { useState } from "react";
>>>>>>> 4b48e43391d15d1bef774305912d57bdbfd43629

function writeRatingStars(stars) {
  let ratingStars = [];
  for (let i = 1; i <= stars; i++) {
    ratingStars.push("★");
  }
  for (let i = 1; i <= 5 - stars; i++) {
    ratingStars.push("☆");
  }
  return ratingStars.join("");
}

const ProductCard = (props) => {
  const { name, price, image, stars, id } = props;
  const history = useHistory();
  const goToDetail = (id) => {
    history.push(`/detail/${id}`);
  };

<<<<<<< HEAD
=======
  //toast
  const [show, setShow] = useState(false);

>>>>>>> 4b48e43391d15d1bef774305912d57bdbfd43629
  const dispatch = useDispatch();
  function addToCart(e) {
    setShow(true);
    e.stopPropagation();
    dispatch(addProductToCart(props, 1));
  }
  return (
    <>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={5000}
        autohide
        //containerPosition={"absolute"}
        // position={"top-end"}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Producto añadido al carrito</strong>
          <small>Ahora</small>
        </Toast.Header>
        <Toast.Body>
          <>
            {name}&nbsp;
            <Link to={"/carrito"}>
              <span>Ver carrito</span>
            </Link>
          </>
        </Toast.Body>
      </Toast>

      <Card style={{ width: "100%" }} onClick={() => goToDetail(id)}>
        <div>
          <img variant="top" src={image} alt={name} />
        </div>

        <Card.Body>
          <Card.Text>CATEGORIA</Card.Text>
          <hr></hr>
          <Card.Title>{name}</Card.Title>
          <div className={"buttons_shop"}>
            <Unicons.UilShoppingCartAlt onClick={(e) => addToCart(e)} />
            <Unicons.UilHeart />
          </div>
          <div className="rating">{writeRatingStars(stars)}</div>

          <div>${price}</div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
