import Card from "react-bootstrap/Card";
import "./card.css";
//UNIcons library
import * as Unicons from "@iconscout/react-unicons";

const ProductCard = ({ name, price, image }) => {
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
        <div>${price}</div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
