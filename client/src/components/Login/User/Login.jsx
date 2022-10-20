import React, { useEffect } from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { postRegister } from "../../../redux/action";

function Login() {
  const dispatch = useDispatch()
  const { isAuthenticated, isLoading, user } = useAuth0();
  
  useEffect(() => {
    dispatch(postRegister(user))
  }, [isAuthenticated])

  if(isLoading) return <h6>Loading...</h6>
  return (
    <div>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}

export default Login;
