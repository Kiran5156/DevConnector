import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import authSlice, { login } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => {
    return state.authSlice.isAuthenticated;
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };
  if (isAuthenticated === true) {
    return <Navigate to="/dashboard"></Navigate>;
  }

  return (
    <section className="container">
      {" "}
      <h1 class="large text-primary">Sign In</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Create Your Account
      </p>
      <form class="form" onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small class="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            // minLength="6"
          />
        </div>

        <input type="submit" class="btn btn-primary" value="Login" />
      </form>
      <p class="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

export default Login;
