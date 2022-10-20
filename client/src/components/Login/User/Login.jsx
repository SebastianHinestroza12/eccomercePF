import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { isAuthenticated, isLoading } = useAuth0();
  if(isLoading) return <h6>Loading...</h6>
  return (
    <div>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}

export default Login;
