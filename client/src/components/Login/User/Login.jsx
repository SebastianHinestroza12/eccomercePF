import React, { useEffect } from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { postRegister } from "../../../redux/action";

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
      dispatch(postRegister(user));
    }
  }, [dispatch, isAuthenticated, user]);
  return <>{isLoading ? <Loading /> : <AuthNAv />}</>;
}

export default Login;
