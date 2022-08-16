import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/esm/Button";

import React from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    )
  );
};

export default LogoutButton;
