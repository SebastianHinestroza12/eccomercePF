import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton() {

    const { logout } = useAuth0();
    const pathname = "http://localhost:3000/"
  return (
    <button onClick={()=>logout({returnTo: window.location.origin})}>logout</button>
  )
}

export default LogoutButton