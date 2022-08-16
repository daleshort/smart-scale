import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/esm/Button";

import React from 'react'

const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

  return (
    !isAuthenticated && (<Button onClick={()=>{loginWithRedirect()}}>
        Login
    </Button>)
  )
}

export default LoginButton