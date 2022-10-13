import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";

import "./card.css";
//UNIcons library
import * as Unicons from "@iconscout/react-unicons";

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

const ProductCard = ({ name, price, image, rating }) => {
  const history = useHistory();
  const goToDetail = (name) => {
    history.push(`/detail/${name}`);
  };

  return (
    <Card style={{ width: "100%" }} onClick={() => goToDetail(name)}>
      {console.log(name, price, image, rating)}
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Text>CATEGORIA</Card.Text>
        <hr></hr>
        <Card.Title>{name}</Card.Title>
        <div className={"buttons_shop"}>
          <Unicons.UilShoppingCartAlt />
          <Unicons.UilHeart />
        </div>
        <div className="rating">{writeRatingStars(rating)}</div>

        <div>${price}</div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
