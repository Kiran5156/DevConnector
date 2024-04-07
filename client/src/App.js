import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { authenticate, logout } from "./redux/authSlice";

import "./App.css";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Alert></Alert>

      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          exact
          path="/dashboard"
          element={
            <PrivateRoute
              path="/dashboard"
              element={<Dashboard />}
            ></PrivateRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
