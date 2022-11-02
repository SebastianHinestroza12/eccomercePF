import React, { useEffect } from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProductToCart,
  logoutUser,
  postRegister,
  saveUserGlobalState,
} from "../../../redux/action";

const AuthNAv = () => {
  const { isAuthenticated } = useAuth0();
  return <div> {isAuthenticated ? <LogoutButton /> : <LoginButton />} </div>;
};
export const Loading = () => {
  const { isLoading } = useAuth0();
  return isLoading && <h6>Loading...</h6>;
};

function Login() {
  const productsInTheCart = useSelector((state) => state.cartProducts);

  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      //mandar localstorage a db => getCart db
      productsInTheCart.map((product) => {
        dispatch(AddProductToCart(product));
      });
      localStorage.removeItem("cartProductsAdded");
      dispatch(postRegister(user));
      dispatch(saveUserGlobalState(user));
    } else {
      localStorage.removeItem("currentUser");
      dispatch(logoutUser());
    }
  }, [dispatch, isAuthenticated, user]);
  return <>{isLoading ? <Loading /> : <AuthNAv />}</>;
}

export default Login;
