import Card from "react-bootstrap/Card";
import "./card.css";
//UNIcons library
import * as Unicons from "@iconscout/react-unicons";

function writeRatingStars(rating) {
  let ratingStars = [];
  for (let i = 1; i <= rating; i++) {
    console.log(<Unicons.UilStar />);
    ratingStars.push("★");
  }
  for (let i = 1; i <= 5 - rating; i++) {
    ratingStars.push("☆");
  }
  console.log("ratingStars", ratingStars.join(""));
  return ratingStars.join("");
}

const ProductCard = ({ name, price, image, rating }) => {
  return (
    <Card style={{ width: "15rem" }}>
      {console.log("nombre", name)}
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
