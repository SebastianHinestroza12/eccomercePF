import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./cartWidget.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getCartDetail } from "../../redux/action";
import { useAuth0 } from "@auth0/auth0-react";

const totalUnitsCart = 0;
let i = 0;

const CartWidget = () => {
  const { user } = useAuth0();

  const dispatch = useDispatch();
  let history = useHistory();

  const quantityAddedToCart = useSelector(
    (state) => state.quantityProductsAdded
  );
  const productsInTheCart = useSelector((state) => state.cartProducts);
  const currentUser = useSelector((state) => state.user);

  function goToProduct(id) {
    history.push(`/product/${id}`);
  }
  //const email = user.email;

  useEffect(() => {
    //console.log("user widget 2", currentUser.email);
    currentUser && dispatch(getCartDetail(currentUser.email));
  }, [dispatch, currentUser, productsInTheCart]);

  const getTotalUnitsCart = () => {};
  return (
    <>
      <DropdownButton
        align="end"
        id="dropdown-cart"
        title={<Unicons.UilShoppingCartAlt />}
      >
        {console.log("productsInTheCart cartwidget", productsInTheCart.length)}
      </DropdownButton>
    </>
  );
};
export default CartWidget;
