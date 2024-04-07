import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const isAuthenticated = useSelector(
    (state) => state.authSlice.isAuthenticated
  );
  const dispatch = useDispatch();

  // nClick={dispatch(logout())}
  const authLinks = (
    <React.Fragment>
      <ul>
        <li>
          <a
            href="#!"
            onClick={() => {
              dispatch(logout());
            }}
          >
            <i className="fas fa-sign-out-alt"></i>{" "}
            <span className="hide-sm"> Logout</span>
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
  const guestLinks = (
    <React.Fragment>
      <ul>
        <li>
          <Link to="/">Developers</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </React.Fragment>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

export default Navbar;
