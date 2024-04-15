import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/profileSlice";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const isLoading = useSelector((state) => state.profileSlice.isLoading);

  const profile = useSelector((state) => state.profileSlice.profile);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <section class="container">
      {isLoading && profile === null ? (
        <Spinner></Spinner>
      ) : (
        <React.Fragment>
          <h1 class="large text-primary">Dashboard</h1>
          <p class="lead">
            <i class="fas fa-user"></i> Welcome{" "}
            {profile !== null && profile.user.name}
          </p>
          {profile !== null ? (
            <Fragment>
              <DashboardActions />
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </Fragment>
          )}
        </React.Fragment>
      )}
    </section>
  );
};

export default Dashboard;
