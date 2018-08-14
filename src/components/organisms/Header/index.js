import React from "react";
// import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <header>
      <div className="container">
        <Link to={"/"} className="logo">
          <img
            src="https://bestofjs.org/svg/bestofjs.svg"
            alt="bestofjs.org"
            width="160"
            style={{ transform: `translateY(5px)` }}
          />
        </Link>
        <Link to={"/"} className="button">
          Home
        </Link>
        <Link to={"projects"} className="button">
          Projects
        </Link>
        <Link to={"status"} className="button">
          Status
        </Link>
      </div>
    </header>
  );
};

// Header.propTypes = {}

export default Header;
