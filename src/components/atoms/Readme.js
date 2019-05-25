import React from "react";
import PropTypes from "prop-types";
import { Label2 } from "baseui/typography";
import { Spinner } from "baseui/spinner";

const Readme = ({ html, isLoading }) => {
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div style={{ width: "100%" }}>
      <Label2>README.md</Label2>
      {html && (
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
};

Readme.propTypes = {
  html: PropTypes.string,
  isLoading: PropTypes.bool
};

export default Readme;
