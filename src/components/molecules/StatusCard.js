import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Spinner from "../atoms/Spinner";

const Div = styled.div`
  .section {
    background-color: white;
  }
`;

const Card = ({ title, url, status, responseTime, isLoading, reload }) => {
  return (
    <Div className="card">
      <div className="section dark">{title}</div>
      <div className="section">
        <a href={url} target="_blank">
          <span className="icon-link" /> Open
        </a>
      </div>
      {isLoading ? (
        <div className="section">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <div className="section">
            <mark className="tertiary">OK</mark> TIME {responseTime} ms
          </div>
          <div className="section">
            <button className="small" onClick={reload}>
              REFRESH
            </button>
          </div>
        </Fragment>
      )}
    </Div>
  );
};

Card.propTypes = {
  responseTime: PropTypes.number.isRequired
};

export default Card;
