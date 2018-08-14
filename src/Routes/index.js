import React from "react";
// import PropTypes from 'prop-types'
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProjectsPage from "../pages/ProjectsPage";
import StatusPage from "../pages/StatusPage";

const Routes = props => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/projects" component={ProjectsPage} />
      <Route exact path="/status" component={StatusPage} />
    </Switch>
  );
};

// Routes.propTypes = {}

export default Routes;
