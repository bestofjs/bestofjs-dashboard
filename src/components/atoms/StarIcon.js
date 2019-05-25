import React from "react";
import { styled } from "styletron-react";

const Span = styled("span", {
  color: "#fa9e59",
  marginLeft: "2px"
});

const StarIcon = () => <Span>★</Span>;

export default StarIcon;
