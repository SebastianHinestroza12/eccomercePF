import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addProductToCart} from "../../redux/action"
import "./card.css";
//UNIcons library
import * as Unicons from "@iconscout/react-unicons";

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

  const dispatch = useDispatch();
  function addToCart(e) {
    e.stopPropagation();
    dispatch(addProductToCart(props, 1));
  }
  return (
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
  );
};

export default ProductCard;
