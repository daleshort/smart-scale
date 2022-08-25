import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./Layout";


import React, { useReducer } from "react";

import RequireAuth from "./RequireAuth";


import { Routes, Route } from "react-router-dom";
import Login from "./old_Login";

import Register from "./Register";
import Home from "./Home";
import FoodScale from "./FoodScale";
import CatchAll from "./CatchAll";



function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path='home' element ={<Home/>} />
        <Route path='food' element ={<FoodScale/>} />
        <Route element={<RequireAuth />}>
        </Route>
        <Route path='/*' element ={<FoodScale/>} />
      </Route>
    </Routes>
  )
}

export default App;
