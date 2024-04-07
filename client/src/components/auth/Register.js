import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { setAlert, removeAlert } from "../../redux/alertSlice";
import { setAndRemoveAlert } from "../../redux/alertSlice";

import { register } from "../../redux/authSlice";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  const onSubmit = async (e) => {
    e.preventDefault();
    const id = uuidv4();
    if (password !== password2) {
      dispatch(
        setAndRemoveAlert({
          msg: "Passwords do not match",
          alertType: "danger",
          id,
        })
      );
      // setTimeout(() => {
      //   console.log("removing alert");
      //   dispatch(removeAlert({ id }));
      // }, 5000);

      return;
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <section className="container">
      {" "}
      <h1 class="large text-primary">Sign Up</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Create Your Account
      </p>
      <form class="form" onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
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
        <div class="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </form>
      <p class="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

export default Register;
