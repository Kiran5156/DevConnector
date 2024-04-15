import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import store from "./redux/store";
// import { authenticate, logout } from "./redux/authSlice";

import "./App.css";
import { authenticate } from "./redux/authSlice";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authenticate());
  }, []);
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
        <Route
          exact
          path="/create-profile"
          element={<PrivateRoute element={<CreateProfile />}></PrivateRoute>}
        ></Route>
        <Route
          exact
          path="/edit-profile"
          element={<PrivateRoute element={<EditProfile />}></PrivateRoute>}
        ></Route>
        <Route
          exact
          path="/add-experience"
          element={<PrivateRoute element={<AddExperience />}></PrivateRoute>}
        ></Route>
        <Route
          exact
          path="/add-education"
          element={<PrivateRoute element={<AddEducation />}></PrivateRoute>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
