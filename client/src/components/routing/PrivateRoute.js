import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Landing from "../layout/Landing";

const PrivateRoute = ({ element, path }) => {
  const isAuthenticated = useSelector(
    (state) => state.authSlice.isAuthenticated
  );
  const navigate = useNavigate();
  const [content, setContent] = useState();

  React.useEffect(() => {
    if (isAuthenticated === true) {
      setContent(element);
    } else {
      navigate("/");
    }
  }, [isAuthenticated, element]);

  return <div>{content}</div>;
};

export default PrivateRoute;
