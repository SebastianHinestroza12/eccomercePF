import React, { useEffect } from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import {
  addProductFromLocalStorage,
  getCartDetail,
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
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const userLogged = user;
      dispatch(postRegister(user));
      dispatch(saveUserGlobalState(user));
      //mandar localstorage a db => getCart db
      if (JSON.parse(localStorage.getItem("cartProductsAdded"))?.length > 0) {
        console.log("user logged", userLogged);

        JSON.parse(localStorage.getItem("cartProductsAdded")).forEach(
          (product) => {
            dispatch(addProductFromLocalStorage({ product, user: user }));
          }
        );
        localStorage.removeItem("cartProductsAdded");
      }
      dispatch(getCartDetail(userLogged.email));
    } else {
      localStorage.removeItem("currentUser");
      dispatch(logoutUser());
    }
  }, [dispatch, isAuthenticated, user]);
  return <>{isLoading ? <Loading /> : <AuthNAv />}</>;
}
export default Login;