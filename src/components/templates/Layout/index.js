import React from "react";
// import PropTypes from 'prop-types'
import Header from "../../organisms/Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">{children}</div>
    </div>
  );
};

// Layout.propTypes = {}

export default Layout;
