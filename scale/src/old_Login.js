import React from "react";
import { useRef, useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";

import { Link, useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/form"
import axios from "./api/axios";
import Button from "react-bootstrap/esm/Button";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth/jwt/create/",
        {
          username: user,
          password: pwd,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      const accessToken = response?.data?.access;
      const refreshToken = response?.data?.refresh;

      setAuth({user, pwd, accessToken, refreshToken});
      // setUser("");
      // setPwd("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("no server response");
      } else if (error.response?.status === 400) {
        setErrMsg("missing username or password");
      } else if (error.response?.status === 401) {
        setErrMsg("bad credentials");
      } else {
        setErrMsg("login failed");
      }
      errRef.current.focus();
    }
  };

  const getForm = ()=>{
    return( <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      
      <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="username">Username:</Form.Label>
        <Form.Control
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        </Form.Group>
        <Form.Group>
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        </Form.Group>
        <br/>
        <Button type="submit">Sign In</Button>
      </Form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          
          <Link to='/register'>Sign Up</Link>
        </span>
      </p>
    </section>)
  }

  return (

    <div className="flex-container">
        <div className="flex-title">
          <div className="title-text-only">

          <div>

             Login


            </div>

          </div>
        </div>
        <div className="flex-item">
          {getForm()}
        </div>
      </div>
  );
};

export default Login;
