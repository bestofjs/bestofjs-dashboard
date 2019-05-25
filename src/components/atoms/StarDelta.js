import React from "react";

const StarDelta = ({ delta }) => {
  if (delta === undefined) return <span style={{ color: "#aaa" }}>N/A</span>;
  if (delta === 0) return "=";
  if (delta < 0) return <span style={{ color: "red" }}>{delta}</span>;
  return <span>+ {delta}</span>;
};

export default StarDelta;
