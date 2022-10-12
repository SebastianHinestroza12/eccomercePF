import Card from "react-bootstrap/Card";
import "./card.css";
//UNIcons library
import * as Unicons from "@iconscout/react-unicons";

const ProductCard = ({ name, price }) => {
  return (
    <Card style={{ width: "15rem" }}>
      {console.log("nombre", name)}
      <Card.Img
        variant="top"
        src="https://demo2.drfuri.com/martfury12/wp-content/uploads/sites/53/2017/09/1a-300x300.jpg"
      />
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
