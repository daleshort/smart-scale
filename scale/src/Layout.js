import "./layout.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Layout() {
  const { logout,user, isAuthenticated, loginWithRedirect } = useAuth0();

  const navigate = useNavigate();
  const handleSelect = (eventKey) => {
    if (eventKey == "logout") {
      console.log("logout clicked");
      logout({ returnTo: window.location.origin })
    } else if (eventKey == "register") {
      navigate("/register");
    } else if (eventKey == "login") {
      loginWithRedirect();
    } else if (eventKey == 'home'){
        navigate("/home");
    }else if (eventKey == "food") {
      navigate("/food");
    }
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <div className="food-item-border-wrap"><Navbar.Brand>Smart Scale</Navbar.Brand></div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" key='links' onSelect={handleSelect} activeKey={null}>
              {/* <Nav.Link eventKey="home">Home</Nav.Link>
              <Nav.Link eventKey="food">Food</Nav.Link> */}
            </Nav>
            <Nav onSelect={handleSelect} key = 'dropdown' activeKey={null}>
              <NavDropdown
                title={user? user?.nickname : "Log In To Customize!"}
                id="nav-dropdown"
                variant="secondary"
              >
                {user && (
                  <NavDropdown.Item key="logout" eventKey="logout">Logout</NavDropdown.Item>
                )}
                {!user && (
                <NavDropdown.Item key="login"  eventKey="login">Login</NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}
