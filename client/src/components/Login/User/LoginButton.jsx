import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { postRegister } from "../../../redux/action";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  // const distpach = useDispatch();
  // const name = user.name;
  // useEffect(() => {
  //   distpach(postRegister(user))
  // }, [])

  return <button onClick={() => loginWithRedirect()}>Login</button>;
}

export default LoginButton;
